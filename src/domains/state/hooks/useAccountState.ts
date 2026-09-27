import { useCallback, useEffect, useState } from 'react';
import { $PN, PNChannel } from '@PlayAb/shared';
import { usePubnub } from '../../../common/utils/Pubnub';

export type AccountAction = 'start' | 'stop' | null;

interface UseAccountStateParams {
  build: string;
}

export function useAccountState({ build }: UseAccountStateParams) {
  const [machines, setMachines] = useState<{ [hostname: string]: number }>({});
  const [targetHostname, setTargetHostname] = useState<string>('');
  const [lastAction, setLastAction] = useState<AccountAction>(null);

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

  return {
    build,
    targetHostname,
    hasTarget,
    lastAction,
    start,
    stop,
    clearLastAction,
  };
}

export default useAccountState;
