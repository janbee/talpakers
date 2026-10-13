import { useCallback, useEffect, useState } from 'react';
import { $PN, PNChannel, UserSupabaseModel } from '@PlayAb/shared';
import { SharedApiSupabase } from '@PlayAb/services';
import { firstValueFrom } from 'rxjs';
import { usePubnub } from '../../../common/utils/Pubnub';

export type AccountAction = 'start' | 'stop' | null;

interface UseAccountStateParams {
  build: string;
}

export interface AccountTotals {
  totalDeposits: number;
  totalWithdrawals: number;
  totalEarnings: number;
  lifetimeWinAndLoss: number;
}

export function useAccountState({ build }: UseAccountStateParams) {
  const [machines, setMachines] = useState<{ [hostname: string]: number }>({});
  const [targetHostname, setTargetHostname] = useState<string>('');
  const [lastAction, setLastAction] = useState<AccountAction>(null);
  const [user, setUser] = useState<UserSupabaseModel | null>(null);
  const [totalsLoading, setTotalsLoading] = useState<boolean>(false);

  usePubnub(
    PNChannel.AccountCount,
    useCallback((msg: { [k: string]: number } | { data: { [k: string]: number } }) => {
      const hostData =
        'data' in msg && typeof msg.data === 'object' && !Array.isArray(msg.data)
          ? (msg.data as { [k: string]: number })
          : (msg as { [k: string]: number });
      setMachines((prev) => ({ ...prev, ...hostData }));
    }, [])
  );

  // Fetch the user record for this build to surface the lifetime totals.
  useEffect(() => {
    if (!build) {
      setUser(null);
      return;
    }
    let cancelled = false;
    setTotalsLoading(true);
    firstValueFrom(SharedApiSupabase.getUsersWithWeeklySummary(undefined, build))
      .then((res) => {
        if (cancelled) return;
        setUser(res?.data?.[0] ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null);
      })
      .finally(() => {
        if (cancelled) return;
        setTotalsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [build]);

  // Once any machine announces itself, pick the first one as the target
  useEffect(() => {
    const first = Object.keys(machines)[0];
    if (first && !targetHostname) setTargetHostname(first);
  }, [machines, targetHostname]);

  const hasTarget = !!targetHostname;

  const start = useCallback(async () => {
    if (!targetHostname) return;
    setLastAction('start');
    try {
      await $PN.publish({
        channel: PNChannel.OpenAccount,
        message: { account: build, hostname: targetHostname },
      });
    } catch {
      setLastAction(null);
    }
  }, [build, targetHostname]);

  const stop = useCallback(async () => {
    if (!targetHostname) return;
    setLastAction('stop');
    try {
      await $PN.publish({
        channel: PNChannel.CloseAccount,
        message: { account: build, hostname: targetHostname },
      });
    } catch {
      setLastAction(null);
    }
  }, [build, targetHostname]);

  const clearLastAction = useCallback(() => setLastAction(null), []);

  const totalDeposits = user?.data?.totalDeposits ?? 0;
  const totalWithdrawals = user?.data?.totalWithdrawals ?? 0;
  const lifetimeWinAndLoss = parseFloat(user?.data?.userSession?.GPD?.lifetimeWinAndLoss ?? '0') || 0;
  const totals: AccountTotals = {
    totalDeposits,
    totalWithdrawals,
    // Cash flow: net cash the player has taken out of the platform.
    totalEarnings: totalWithdrawals - totalDeposits,
    lifetimeWinAndLoss,
  };

  return {
    build,
    targetHostname,
    hasTarget,
    lastAction,
    start,
    stop,
    clearLastAction,
    totals,
    totalsLoading,
    user,
  };
}

export default useAccountState;
