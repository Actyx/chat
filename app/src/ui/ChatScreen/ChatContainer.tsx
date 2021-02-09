import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { sendMessageToChannel } from '../../business-logic/channel-fish/logic';
import {
  ChannelFishState,
  Messages,
} from '../../business-logic/channel-fish/types';
import {
  editUserProfile,
  getDisplayNameByUserUUID,
} from '../../business-logic/users-catalog-fish/logic';
import {
  Users,
  UsersCatalogFishState,
} from '../../business-logic/users-catalog-fish/types';
import { closeSectionRight } from '../ui-state-manager/actions';
import { SectionRight } from '../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../ui-state-manager/UIStateManager';
import { UserProfileDetails } from '../UserProfileDetails/UserProfileDetails';
import { Channel, MessagesUI } from './Channel/Channel';
import { MessageInput } from './Channel/MessageInput';
import { TopBar } from './TopBar';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
  stateChannelMainFish: ChannelFishState;
}>;

const getVisiblePublicMessages = (messages: Messages) =>
  messages.filter((x) => x.isHidden === false);

const mapPublicMessagesToUI = (messages: Messages, users: Users): MessagesUI =>
  messages.map((m) => {
    const senderDisplayName =
      getDisplayNameByUserUUID(m.senderId, users) ?? 'user not found';
    return {
      messageId: m.messageId,
      timestamp: m.editedOn ? m.editedOn / 1_000_0000 : m.createdOn / 1_000_000,
      senderDisplayName,
      isHidden: m.isHidden,
      content: m.content,
    };
  });

export const ChatContainer: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
  stateChannelMainFish,
}) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [errorPond, setErrorPond] = React.useState<string>();

  const userDisplayName = getDisplayNameByUserUUID(
    stateUI.signedInUserUUID,
    stateUsersCatalogFish.users
  );

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const isUserProfileEdited = await editUserProfile(pond)(
        stateUsersCatalogFish.users,
        stateUI.signedInUserUUID,
        displayName
      );
      if (isUserProfileEdited === true) {
        dispatch(closeSectionRight());
      }
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessageToChannel(pond)(stateUI.activeChannelId)(
        stateUI.signedInUserUUID
      )({
        content,
      });
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const messagesUI = mapPublicMessagesToUI(
    getVisiblePublicMessages(stateChannelMainFish.messages),
    stateUsersCatalogFish.users
  );

  return (
    <div>
      {errorPond}
      <TopBar userDisplayName={userDisplayName ?? ''} />
      <div>left - main side bar here</div>
      <div>
        <Channel messages={messagesUI} />
        <MessageInput sendMessage={handleSendMessage} />
      </div>
      <div>
        {stateUI.sectionRight === SectionRight.UserProfileEdit && (
          <UserProfileDetails editUserProfile={handleEditUserProfile} />
        )}
      </div>
    </div>
  );
};
