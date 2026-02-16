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
        count: 10, // Get more messages to capture all hosts
      })
      .then((r) => {
        const messages = r.channels[channel] || [];

        // Aggregate by hostname (latest message per host)
        const hostnameMap = new Map();

        // Process messages in reverse (oldest to newest) so latest overwrites
        messages.reverse().forEach((msg: any) => {
          const data = msg.message.data;
          // data is like { "hostname1": 5 } or { "hostname2": 3 }
          Object.keys(data).forEach((hostname) => {
            hostnameMap.set(hostname, data[hostname]);
          });
        });

        // Convert to array or object
        const allHostData = Object.fromEntries(hostnameMap);
        console.log('All hosts:', allHostData);
        // { "hostname1": 5, "hostname2": 3, "hostname3": 2 }

        onMessage(allHostData);
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
