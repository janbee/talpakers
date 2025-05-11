import { FC } from 'react';
import { Accordion } from 'semantic-ui-react';
import { BetInfoModel, toMoney } from '@PlayAb/shared';

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
                    return (
                      <div key={bet.build} className={'flex gap-1 justify-between'}>
                        <div className={'flex-1'}>{bet.build}</div>
                        <div className={'flex-1 text-center'}>{toMoney(bet.staked)}</div>
                        <div className={'flex-1 text-center'}>{bet.odds}</div>
                        <div className={'flex-[0.7] text-end'}>{toMoney(bet.staked * bet.odds - bet.staked)}</div>
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
