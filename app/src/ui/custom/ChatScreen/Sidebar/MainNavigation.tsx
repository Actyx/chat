import { Row } from './Row';
import { Typography } from '../../../common/Typography/Typography';
import { SpeakerphoneIcon } from '../../../common/Icons/SpeakerphoneIcon';
import { useContext } from 'react';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { SectionCenter } from '../../../state-manager/types';

type MainNavigationProps = Readonly<{
  channelCatalog: () => void;
}>;

export const MainNavigation = ({
  channelCatalog: catalogChannels,
}: MainNavigationProps) => {
  const stateUI = useContext(StateContextUI);

  const color =
    stateUI.sectionCenter === SectionCenter.ChannelsCatalog
      ? 'white'
      : 'gray-light';

  return (
    <Row onClick={catalogChannels}>
      <SpeakerphoneIcon size="base" color={color} />
      <Typography size="base" tag="div" color={color}>
        Channels overview
      </Typography>
    </Row>
  );
};
