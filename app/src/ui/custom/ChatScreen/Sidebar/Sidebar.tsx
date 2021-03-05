import React, { useContext } from 'react';
import { ChannelId } from '../../../../business-logic/message/types';
import {
  showChannelsCatalogSection,
  showChannelSection,
} from '../../../ui-state-manager/actions';
import { DispatchContextUI } from '../../../ui-state-manager/UIStateManager';
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
  activeChannelId: ChannelId;
  showAddChannelDialog: () => void;
}>;

export const Sidebar = ({
  appName,
  channels,
  users,
  activeChannelId,
  showAddChannelDialog,
}: SidebarProps) => {
  const dispatch = useContext(DispatchContextUI);

  const handleChannelsCatalog = () => dispatch(showChannelsCatalogSection());

  const handleMain = (channelId: ChannelId) =>
    dispatch(showChannelSection(channelId));

  const handleShowAddChannelDialog = () => showAddChannelDialog();

  return (
    <div className="w-60 h-full bg-gray-700 sidebar">
      <Header appName={appName} />
      <Body>
        <Section>
          <MainNavigation channelCatalog={handleChannelsCatalog} />
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
            <ChannelsList
              channels={channels}
              activeChannelId={activeChannelId}
              selectChannel={handleMain}
            />
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
          <button onClick={handleShowAddChannelDialog}>Add a Channel</button>
        </Section>
      </Body>
    </div>
  );
};
