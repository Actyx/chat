import { ChannelId } from '../../../business-logic/message/types';
import { HashtagIcon } from '../../common/Icons/HashtagIcon';
import { Typography } from '../../common/Typography/Typography';
import { ChannelsListUI } from './Sidebar';
import { Row } from './Row';

type ChannelsListProps = Readonly<{
  channels: ChannelsListUI;
  activeChannelId: ChannelId;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsList = ({
  channels,
  activeChannelId,
  selectChannel,
}: ChannelsListProps) => {
  return (
    <>
      {channels.map((x) => {
        const isActiveChannel = x.channelId === activeChannelId;
        const color = isActiveChannel ? 'white' : 'gray-light';

        return (
          <Row key={x.channelId} onClick={() => selectChannel(x.channelId)}>
            <div className="flex items-center pl-4 space-x-2">
              <HashtagIcon size="sm" color={color} />
              <Typography
                tag="div"
                size="base"
                color={color}
                weight={isActiveChannel ? 'semibold' : 'normal'}
              >
                {x.name}
              </Typography>
            </div>
          </Row>
        );
      })}
    </>
  );
};
