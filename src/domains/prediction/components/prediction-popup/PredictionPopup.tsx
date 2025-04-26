import { FC, useState } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { PredictionList } from '../../../../domains/prediction';
import PredictionFilter from '../prediction-filter/PredictionFilter';

const PredictionPopupComponent: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popup
      position="bottom right"
      on="click"
      inverted
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      className={'flex h-[calc(100vh-90px)] !p-4'}
      trigger={<Icon circular inverted className={'cursor-pointer !text-xl'} name="magic" />}
    >
      <div className={'w-[320px] h-full flex flex-col'}>
        <PredictionList />
        <PredictionFilter />
      </div>
    </Popup>
  );
};
PredictionPopupComponent.displayName = 'PredictionPopup';
export default PredictionPopupComponent;
