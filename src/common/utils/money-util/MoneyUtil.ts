import { MoneyModel } from '@PlayAbWeb/api/index';
import { merge } from 'lodash';

const MoneyUtil = (money: string | number, config?: MoneyModel) => {
  const _config = merge(
    {
      currency: 'USD',
      minimumFractionDigits: 2,
    } as MoneyModel,
    config,
  );
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: _config.currency,
    minimumFractionDigits: _config.minimumFractionDigits,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(parseFloat(money.toString()));
};

export default MoneyUtil;
