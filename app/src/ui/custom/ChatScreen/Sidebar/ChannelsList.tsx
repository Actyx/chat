import { ChannelId } from '../../../../business-logic/message/types';
import { HashtagIcon } from '../../../common/Icons/HashtagIcon';
import { Typography } from '../../../common/Typography/Typography';
import { ChannelsListUI } from './Sidebar';
import { Row } from './Row';
import { useContext } from 'react';
import { StateContextUI } from '../../../ui-state-manager/UIStateManager';

type ChannelsListProps = Readonly<{
  channels: ChannelsListUI;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsList = ({
  channels,
  selectChannel,
}: ChannelsListProps) => {
  const stateUI = useContext(StateContextUI);

  return (
    <>
      {channels.map((x) => {
        const isActiveChannel = x.channelId === stateUI.activeChannelId;
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
