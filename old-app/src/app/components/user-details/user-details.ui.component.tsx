import { EarningsModel } from '@models/custom.models';
import { Money } from '@utilities/utils';
import React from 'react';
import { Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment/moment';

export const ApproxWinnings = ({ earnings }: { earnings: EarningsModel }) => {
  return (
    <div className="row-wrap">
      <span>Winnings</span>

      <Popup
        content="Approximate Earnings."
        position="top center"
        trigger={
          <span
            className={classNames({
              approx: true,
            })}
          >
            {Money(earnings.approxWinnings)}
          </span>
        }
      />
    </div>
  );
};

export const Winnings = ({ earnings }: { earnings: EarningsModel }) => {
  return (
    <div className="row-wrap">
      <span>Winnings</span>

      <Popup
        disabled={!earnings.bonusDateTime}
        content={moment(earnings.bonusDateTime).format('ddd hh:mm A')}
        position="top center"
        trigger={
          <span
            className={classNames({
              winnings: earnings.winnings > 0,
              losses: earnings.winnings < 0,
            })}
          >
            {Money(earnings.winnings)}
          </span>
        }
      />
    </div>
  );
};
