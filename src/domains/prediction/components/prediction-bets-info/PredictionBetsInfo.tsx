import { FC } from 'react';
import { Accordion, Popup } from 'semantic-ui-react';
import { BetInfoModel, toMoney } from '@PlayAb/shared';
import classNames from 'classnames';

interface PredictionBetsInfoProps {
  usersBetInfo: BetInfoModel[];
}

const PredictionBetsInfoComponent: FC<PredictionBetsInfoProps> = ({ usersBetInfo }) => {

  if (!usersBetInfo || usersBetInfo.length === 0) {
    return null;
  }
  return (
    <div data-testid="PredictionBetsInfo" className={'mt-2 text-sm'}>
      <Accordion
        panels={[
          {
            key: `panel-${0}`,
            title: (
              <Accordion.Title className={'flex justify-between !m-0 !p-0'}>
                <span className={'text-white'}>B#({usersBetInfo.length})</span>
                <i className="dropdown icon text-white" />
              </Accordion.Title>
            ),
            content: {
              content: (
                <>
                  {usersBetInfo.map((bet) => {
                    const staked = bet.staked || 0;
                    const teams = bet.teams || '';
                    const winnings = bet.winnings || 0;

                    return (
                      <div
                        key={bet.build}
                        className={classNames({
                          'flex gap-1 justify-between': true,
                          'text-green-dark': winnings > 0,
                          'text-yellow-dark': winnings === 0,
                          'text-red-dark': winnings < 0 && bet.status !== 'Placed',
                          'text-white': bet.status === 'Placed',
                        })}
                      >
                        <div className={'flex-1'}>{bet.build}</div>
                        <Popup position={'left center'} trigger={<div className={'flex-1 text-center'}>{staked}</div>}>
                          <Popup.Content>
                            <div className={'flex-1 text-center'}>{teams}</div>
                          </Popup.Content>
                        </Popup>
                        <div className={'flex-1 text-center'}>{bet.odds}</div>
                        <div className={'flex-[0.7] text-end'}>{toMoney(winnings)}</div>
                      </div>
                    );
                  })}
                </>
              ),
            },
          },
        ]}
      />
    </div>
  );
};
PredictionBetsInfoComponent.displayName = 'PredictionBetsInfo';
export default PredictionBetsInfoComponent;
