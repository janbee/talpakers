import * as React from 'react';
import { useCallback } from 'react';
import { $PN, PNChannel, UserSupabaseModel } from '@PlayAb/shared';
import { usePubnub } from '../../../../common/utils/Pubnub';

const UserPubnubComponent: React.FC<{ user: UserSupabaseModel }> = ({ user }) => {
  const [machines, setMachines] = React.useState<{ [key: string]: number }>({});

  const onMessage = useCallback((msg: { [key: string]: number } | { data: { [key: string]: number } }) => {
    // Handle both message formats:
    // 1. Direct: { "Janbetlogss-MacBook-Pro.local": 1, "janbee.local": 1 }
    // 2. Wrapped: { data: { "Janbetlogss-MacBook-Pro.local": 1, "janbee.local": 1 } }
    let hostData: { [key: string]: number };

    if ('data' in msg && typeof msg.data === 'object' && !Array.isArray(msg.data)) {
      hostData = msg.data as { [key: string]: number };
    } else {
      hostData = msg as { [key: string]: number };
    }

    console.log('gaga---------------------------msg----------', hostData);
    setMachines((prev) => ({ ...prev, ...hostData }));
  }, []);

  usePubnub(PNChannel.AccountCount, onMessage);

  const sendToMachine = useCallback(
    (os: string) => {
      $PN
        .publish({
          channel: PNChannel.OpenAccount,
          message: {
            account: user.data.build,
            hostname: os,
          },
        })
        .catch()
        .finally();
    },
    [user.data.build]
  );

  return (
    <div className={'cursor-pointer'}>
      {Object.entries(machines).map(([hostname, count]) => (
        <div
          key={hostname}
          onClick={(e) => {
            e.stopPropagation();
            sendToMachine(hostname);
          }}
        >
          {hostname}: {count}
        </div>
      ))}
    </div>
  );
};
UserPubnubComponent.displayName = 'UserPubnubComponent';
export default UserPubnubComponent;
