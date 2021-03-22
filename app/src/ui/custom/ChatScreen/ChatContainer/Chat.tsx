import React, { ReactNode, useState } from 'react';
import {
  Dialogs,
  SectionCenter,
  SectionRight,
} from '../../../state-manager/state-types';
import { ChannelId } from '../../../../business-logic/message/types';
import './chat.css';
import { ErrorBoundary } from '../../../common/ErrorBoundary/ErrorBoundary';
import { UserProfileDetailsContainer } from '../../UserProfileDetails/UserProfileDetailsContainer';
import { AddChannelDialogContainer } from '../AddChannelDialog/AddChannelDialogContainer';
import { EditChannelDialogContainer } from '../EditChannelDialog/EditChannelDialogContainer';
import { SideBarContainer } from '../Sidebar/SidebarContainer';
import { ChannelsCatalogContainer } from '../ChannelsCatalog/ChannelOverview/ChannelsCatalogContainer';
import { ChannelContainer } from '../Channel/ChannelContainer';
import { TopBarContainer } from '../TopBar/TopBarContainer';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';

const MainContent = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className="fixed w-full flex chat-content">{children}</div>;
};

type ChatProps = Readonly<{
  userUUID: UserUUID;
  dialog: Dialogs;
  sectionRight: SectionRight;
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
}>;

export const Chat = ({
  userUUID,
  dialog,
  sectionRight,
  sectionCenter,
  activeChannelId,
}: ChatProps) => {
  const [editChannelId, setEditChannelId] = useState<ChannelId>();

  const canShowUserProfileDetails =
    sectionRight === SectionRight.UserProfileEdit;

  const handleactiveEditChannelId = (channelId: ChannelId) =>
    setEditChannelId(channelId);

  const renderDialog = () => {
    switch (dialog) {
      case Dialogs.AddChannel:
        return <AddChannelDialogContainer userUUID={userUUID} />;
      case Dialogs.EditChannel:
        return editChannelId ? (
          <EditChannelDialogContainer
            userUUID={userUUID}
            selectedChannelId={editChannelId}
          />
        ) : undefined;
      case Dialogs.None:
        return undefined;
    }
  };

  const renderSectionCenter = () => {
    switch (sectionCenter) {
      case SectionCenter.Channel:
        return (
          <ChannelContainer
            userUUID={userUUID}
            activeChannelId={activeChannelId}
          />
        );
      case SectionCenter.ChannelsCatalog:
        return (
          <ChannelsCatalogContainer
            userUUID={userUUID}
            activeEditChannelId={handleactiveEditChannelId}
          />
        );
    }
  };

  return (
    <div>
      <TopBarContainer userUUID={userUUID} />
      <MainContent>
        <ErrorBoundary>
          <SideBarContainer
            userUUID={userUUID}
            sectionCenter={sectionCenter}
            activeChannelId={activeChannelId}
          />
        </ErrorBoundary>
        <ErrorBoundary>{renderSectionCenter()}</ErrorBoundary>
        <ErrorBoundary>
          {canShowUserProfileDetails && (
            <UserProfileDetailsContainer userUUID={userUUID} />
          )}
        </ErrorBoundary>
      </MainContent>
      {renderDialog()}
    </div>
  );
};
