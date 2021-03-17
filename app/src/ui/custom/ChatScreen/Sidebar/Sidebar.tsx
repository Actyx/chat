import React from 'react';
import { ChannelId } from '../../../../business-logic/message/types';
import { ChannelsList } from './ChannelsList';
import { Typography } from '../../../common/Typography/Typography';
import { CollapsibleList } from './CollapsibleList';
import { ChevronDownIcon } from '../../../common/Icons/ChevronDownIcon';
import { ChevronRightIcon } from '../../../common/Icons/ChevronRightIcon';
import { Section } from './Section';
import { MainNavigation } from './MainNavigation';
import './sidebar.css';
import { Header } from './Header';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { UsersList } from './UsersList';
import { Body } from './Body';

export type UsersListUI = ReadonlyArray<{
  userUUID: UserUUID;
  name: string;
}>;

export type ChannelsListUI = ReadonlyArray<{
  channelId: ChannelId;
  name: string;
}>;

type SidebarProps = Readonly<{
  appName: string;
  channels: ChannelsListUI;
  users: UsersListUI;
  selectChannelsCatalog: () => void;
  selectChannel: (channelId: ChannelId) => void;
}>;

export const Sidebar = ({
  appName,
  channels,
  users,
  selectChannelsCatalog,
  selectChannel,
}: SidebarProps) => {
  return (
    <div className="w-60 h-full bg-gray-700 sidebar">
      <Header appName={appName} />
      <Body>
        <Section>
          <MainNavigation channelCatalog={selectChannelsCatalog} />
        </Section>
        <Section>
          <CollapsibleList
            iconOpen={<ChevronDownIcon size="xs" color="gray-light" />}
            iconClose={<ChevronRightIcon size="xs" color="gray-light" />}
            title={
              <Typography size="base" tag="div" color="gray-light">
                Channels
              </Typography>
            }
          >
            <ChannelsList channels={channels} selectChannel={selectChannel} />
          </CollapsibleList>
        </Section>
        <Section>
          <CollapsibleList
            iconOpen={<ChevronDownIcon size="xs" color="gray-light" />}
            iconClose={<ChevronRightIcon size="xs" color="gray-light" />}
            title={
              <Typography size="base" tag="div" color="gray-light">
                Users
              </Typography>
            }
          >
            <UsersList users={users} selectUser={() => ({})} />
          </CollapsibleList>
        </Section>
      </Body>
    </div>
  );
};
