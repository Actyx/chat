import { ChannelId } from '../../../business-logic/message/types';
import { ChannelsListUI } from './Sidebar';

type Props = Readonly<{
  channels: ChannelsListUI;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsList = ({ channels, selectChannel }: Props) => {
  return (
    <ul>
      {channels.map((x) => (
        <li key={x.channelId}>
          <button onClick={() => selectChannel(x.channelId)}>{x.name}</button>
        </li>
      ))}
    </ul>
  );
};
