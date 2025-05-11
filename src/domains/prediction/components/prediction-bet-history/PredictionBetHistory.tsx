import { FC } from 'react';
import { PredictionHistoryModel } from '@PlayAb/shared';
import { Accordion } from 'semantic-ui-react';
import classNames from 'classnames';

interface PredictionBetHistoryProps {
  predictionHistory: PredictionHistoryModel[];
}

const PredictionBetHistoryComponent: FC<PredictionBetHistoryProps> = ({ predictionHistory }) => {
  if (!predictionHistory || predictionHistory.length === 0) {
    return null;
  }
  return (
    <div data-testid="PredictionBetHistory" className={'mt-2 text-sm'}>
      <Accordion
        panels={[
          {
            key: `panel-${0}`,
            title: (
              <Accordion.Title className={'flex justify-between !m-0 !p-0'}>
                <span className={'text-white'}>H#({predictionHistory.length})</span>
                <i className="dropdown icon text-white" />
              </Accordion.Title>
            ),
            content: {
              content: (
                <>
                  {predictionHistory.map((item, index) => {
                    return (
                      <div key={index} className={'flex gap-1 justify-between'}>
                        <div
                          className={classNames({
                            'flex-1': true,
                            'text-green-dark': item.teamA === item.winningTeam,
                          })}
                        >
                          {item.teamA}
                        </div>
                        <div
                          className={classNames({
                            'flex-1': true,
                            'text-end': true,
                            'text-green-dark': item.teamB === item.winningTeam,
                          })}
                        >
                          {item.teamB}
                        </div>
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
PredictionBetHistoryComponent.displayName = 'PredictionBetHistory';
export default PredictionBetHistoryComponent;
