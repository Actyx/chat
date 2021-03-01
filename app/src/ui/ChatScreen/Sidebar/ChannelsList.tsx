import { ChannelId } from '../../../business-logic/message/types';
import { HashtagIcon } from '../../common/Icons/HashtagIcon';
import { Typography } from '../../common/Typography/Typography';
import { ChannelsListUI } from './Sidebar';

type Props = Readonly<{
  channels: ChannelsListUI;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsList = ({ channels, selectChannel }: Props) => {
  return (
    <ul className="pl-4">
      {channels.map((x) => (
        <li key={x.channelId}>
          <button
            className="flex items-center space-x-2"
            onClick={() => selectChannel(x.channelId)}
          >
            <HashtagIcon size="sx" color="gray-light" />
            <Typography tag="div" size="sm" color="gray-light">
              {x.name}
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  );
};
