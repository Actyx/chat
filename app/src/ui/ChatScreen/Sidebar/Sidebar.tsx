import React, { useContext } from 'react';
import { ChannelId } from '../../../business-logic/message/types';
import {
  showChannelsCatalogSection,
  showChannelSection,
} from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';
import { ChannelsList } from './ChannelsList';
import { Typography } from '../../common/Typography/Typography';
import { CollapsibleList } from './CollapsibleList';
import { ChevronDownIcon } from '../../common/Icons/ChevronDownIcon';
import { ChevronRightIcon } from '../../common/Icons/ChevronRightIcon';
import { Section } from './Section';
import { MainNavitation as MainNavigation } from './MainNavigation';
import './sidebar.css';
import { Header } from './Header';

export type ChannelsListUI = ReadonlyArray<{
  channelId: ChannelId;
  name: string;
}>;

type SidebarProps = Readonly<{
  appName: string;
  channels: ChannelsListUI;
  activeChannelId: ChannelId;
  showAddChannelDialog: () => void;
}>;

export const Sidebar = ({
  appName,
  channels,
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
      <button onClick={handleShowAddChannelDialog}>Add a Channel</button>
    </div>
  );
};
