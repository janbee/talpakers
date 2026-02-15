import * as React from 'react';
import { useCallback } from 'react';
import { $PN, PNChannel, UserSupabaseModel } from '@PlayAb/shared';
import { usePubnub } from '../../../../common/utils/Pubnub';

const UserPubnubComponent: React.FC<{ user: UserSupabaseModel }> = ({ user }) => {
  const [machines, setMachines] = React.useState<{ [key: string]: number }>({});

  const onMessage = useCallback((msg: { data: { [key: string]: number } }) => {
    console.log('gaga---------------------------msg----------', msg.data);
    setMachines((prev) => ({ ...prev, ...msg.data }));
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
