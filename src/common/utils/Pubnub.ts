import { $PN, PNChannel } from '@PlayAb/shared'
import { useEffect } from 'react'

export function usePubnub(channel: string, onMessage: (msg: any) => void) {
  useEffect(() => {
    const PNListener = {
      message: function (event: any) {
        onMessage(event.message)
      }
    }
    $PN.subscribe({
      channels: [PNChannel.OpenAccount + channel]
    })

    $PN.addListener(PNListener)

    return () => {
      console.log('gaga-----------------------------------unsubscribe--');
      $PN.unsubscribe({
        channels: [PNChannel.OpenAccount + channel]
      })
      $PN.removeListener(PNListener)
    }
  }, [channel, onMessage])
}
