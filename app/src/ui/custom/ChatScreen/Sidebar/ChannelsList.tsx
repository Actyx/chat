import { ChannelId } from '../../../../business-logic/message/types';
import { HashtagIcon } from '../../../common/Icons/HashtagIcon';
import { Typography } from '../../../common/Typography/Typography';
import { ChannelsListUI } from './Sidebar';
import { Row } from './Row';
import { SectionCenter } from '../../../state-manager/state-types';

type ChannelsListProps = Readonly<{
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
  channels: ChannelsListUI;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsList = ({
  sectionCenter,
  activeChannelId,
  channels,
  selectChannel,
}: ChannelsListProps) => {
  return (
    <>
      {channels.map((x) => {
        const isSectionCenterChannel = sectionCenter === SectionCenter.Channel;
        const doesCurrentChannelInListMatchSelectedChannel =
          x.channelId === activeChannelId;

        const isActiveChannel =
          isSectionCenterChannel &&
          doesCurrentChannelInListMatchSelectedChannel;

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
