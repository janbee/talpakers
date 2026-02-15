import { $PN } from '@PlayAb/shared';
import { useEffect } from 'react';

export function usePubnub(channel: string, onMessage: (msg: any) => void) {
  useEffect(() => {
    const PNListener = {
      message: function (event: any) {
        onMessage(event.message);
      },
    };
    $PN.subscribe({
      channels: [channel],
    });

    $PN
      .fetchMessages({
        channels: [channel],
        count: 1,
      })
      .then((r) => {
        onMessage(r.channels[channel][0].message);
      });

    $PN.addListener(PNListener);

    return () => {
      $PN.unsubscribe({
        channels: [channel],
      });
      $PN.removeListener(PNListener);
    };
  }, [channel, onMessage]);
}
