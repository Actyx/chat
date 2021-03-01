import { ChannelId } from '../../../business-logic/message/types';
import { HashtagIcon } from '../../common/Icons/HashtagIcon';
import { Typography } from '../../common/Typography/Typography';
import { ChannelsListUI } from './Sidebar';
import { Row } from './Row';

type Props = Readonly<{
  channels: ChannelsListUI;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsList = ({ channels, selectChannel }: Props) => {
  return (
    <>
      {channels.map((x) => (
        <Row key={x.channelId} onClick={() => selectChannel(x.channelId)}>
          <div className="flex items-center pl-4 space-x-2">
            <HashtagIcon size="sx" color="gray-light" />
            <Typography tag="div" size="sm" color="gray-light">
              {x.name}
            </Typography>
          </div>
        </Row>
      ))}
    </>
  );
};
