import { Row } from './Row';
import { Typography } from '../../common/Typography/Typography';
import { SpeakerphoneIcon } from '../../common/Icons/SpeakerphoneIcon';

type MainNavitationProps = Readonly<{
  channelCatalog: () => void;
}>;
export const MainNavitation = ({
  channelCatalog: catalogChannels,
}: MainNavitationProps) => {
  return (
    <Row onClick={catalogChannels}>
      <SpeakerphoneIcon size="medium" color="gray-light" />
      <Typography size="base" tag="div" color="gray-light">
        Channels overview
      </Typography>
    </Row>
  );
};
