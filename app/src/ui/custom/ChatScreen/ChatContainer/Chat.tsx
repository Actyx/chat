import React, { ReactNode, useContext, useState } from 'react';
import {
  Dialogs,
  SectionCenter,
  SectionRight,
  StateUIAuthenticated,
} from '../../../state-manager/state-types';
import { ChannelId } from '../../../../business-logic/message/types';
import './chat.css';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { ErrorBoundary } from '../../../common/ErrorBoundary/ErrorBoundary';
import { UserProfileDetailsContainer } from '../../UserProfileDetails/UserProfileDetailsContainer';
import { AddChannelDialogContainer } from '../AddChannelDialog/AddChannelDialogContainer';
import { EditChannelDialogContainer } from '../EditChannelDialog/EditChannelDialogContainer';
import { SideBarContainer } from '../Sidebar/SidebarContainer';
import { ChannelsCatalogContainer } from '../ChannelsCatalog/ChannelOverview/ChannelsCatalogContainer';
import { ChannelContainer } from '../Channel/ChannelContainer';
import { TopBarContainer } from '../TopBar/TopBarContainer';

const MainContent = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className="fixed w-full flex chat-content">{children}</div>;
};

export const Chat = () => {
  const stateUI = useContext(StateContextUI) as StateUIAuthenticated;

  const [editChannelId, setEditChannelId] = useState<ChannelId>();

  const canShowUserProfileDetails =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  const handleactiveEditChannelId = (channelId: ChannelId) =>
    setEditChannelId(channelId);

  const renderDialog = () => {
    switch (stateUI.dialog) {
      case Dialogs.AddChannel:
        return <AddChannelDialogContainer />;
      case Dialogs.EditChannel:
        return editChannelId ? (
          <EditChannelDialogContainer selectedChannelId={editChannelId} />
        ) : undefined;
      case Dialogs.None:
        return undefined;
    }
  };

  const renderSectionCenter = () => {
    switch (stateUI.sectionCenter) {
      case SectionCenter.Channel:
        return <ChannelContainer />;
      case SectionCenter.ChannelsCatalog:
        return (
          <ChannelsCatalogContainer
            activeEditChannelId={handleactiveEditChannelId}
          />
        );
    }
  };

  return (
    <div>
      <TopBarContainer />
      <MainContent>
        <ErrorBoundary>
          <SideBarContainer />
        </ErrorBoundary>
        <ErrorBoundary>{renderSectionCenter()}</ErrorBoundary>
        <ErrorBoundary>
          {canShowUserProfileDetails && <UserProfileDetailsContainer />}
        </ErrorBoundary>
      </MainContent>
      {renderDialog()}
    </div>
  );
};
