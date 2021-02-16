import React, { FC } from 'react';
import { ChannelId } from '../../../business-logic/message/types';
import { ChannelsSimpleList } from './Sidebar';

type Props = Readonly<{
  channels: ChannelsSimpleList;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsList: FC<Props> = ({ channels, selectChannel }) => {
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
