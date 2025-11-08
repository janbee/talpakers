import { useEffect, useMemo, useState } from 'react';
import { SharedApiSupabase } from '@PlayAb/services';
import { Get3rdPartyDataResponse, toMoney } from '@PlayAb/shared';

const useHeader = () => {
  const [otherData, setOtherData] = useState<Get3rdPartyDataResponse>({});

  useEffect(() => {
    const obs = SharedApiSupabase.get3rdPartyData().subscribe((res) => {
      if (res.data) {
        setOtherData(res.data);
      }
    });

    return () => {
      obs.unsubscribe();
    };
  }, []);

  const other = useMemo(() => {
    const { webshare, captcha } = otherData;
    // Constants
    const BYTES_TO_GB = (bytes = 0) => Number((bytes / 1024 ** 3).toFixed(2));
    const BYTES_TO_MB = (bytes = 0) => Number((bytes / 1024 ** 2).toFixed(2));
    let webshareTxt = '';
    if (webshare) {
      // Extract used bandwidth (total bytes used in period)

      const usedGB = BYTES_TO_GB(webshare.bandwidth_total);
      const usedMB = BYTES_TO_MB(webshare.bandwidth_total);
      const value = [usedGB && `${usedGB}GB`, usedMB && `${usedMB}MB`].find(Boolean) || '';
      webshareTxt = `WebShare: ${value}`;

      console.log('gaga-------------------------------------', [usedGB && `${usedGB}GB`, usedMB && `${usedMB}MB`]);
    }

    return {
      captcha: `Captcha: ${toMoney(otherData.captcha?.balance || 0)}`,
      webshare: webshareTxt,
    };
  }, [otherData]);

  return { other };
};

export default useHeader;
