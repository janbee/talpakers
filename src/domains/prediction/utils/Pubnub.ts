import { $PN, ActiveGameModel, PNChannel } from '@PlayAb/shared';

export function InitializePubnub(onMessage: (msg: any) => void) {
  const PNListener = {
    message: function (event: any) {
      onMessage(event.message);
    },
  };

  $PN.subscribe({
    channels: [PNChannel.LiveGameDetails],
  });

  $PN.addListener(PNListener);

  return () => {
    $PN.unsubscribe({
      channels: [PNChannel.LiveGameDetails],
    });
    $PN.removeListener(PNListener);
  };
}
