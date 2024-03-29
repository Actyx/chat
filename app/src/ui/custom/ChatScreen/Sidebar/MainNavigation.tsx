import { Row } from './Row';
import { Typography } from '../../../common/Typography/Typography';
import { SpeakerphoneIcon } from '../../../common/Icons/SpeakerphoneIcon';
import { SectionCenter } from '../../../state-manager/state-types';

type MainNavigationProps = Readonly<{
  sectionCenter: SectionCenter;
  channelCatalog: () => void;
}>;

export const MainNavigation = ({
  sectionCenter,
  channelCatalog,
}: MainNavigationProps) => {
  const color =
    sectionCenter === SectionCenter.ChannelsCatalog ? 'white' : 'gray-light';

  return (
    <Row onClick={channelCatalog}>
      <SpeakerphoneIcon size="base" color={color} />
      <Typography size="base" tag="div" color={color}>
        Channels overview
      </Typography>
    </Row>
  );
};
