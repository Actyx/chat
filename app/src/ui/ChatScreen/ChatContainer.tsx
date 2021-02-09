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
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
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

const mapPublicMessagesToUI = (messages: Messages): MessagesUI =>
  messages.map((m) => ({
    messageId: m.messageId,
    timestamp: m.editedOn ? m.editedOn / 1_000_0000 : m.createdOn / 1_000_000,
    senderDisplayName: 'test',
    isHidden: m.isHidden,
    content: m.content,
  }));

export const ChatContainer: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
  stateChannelMainFish,
}) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const userDisplayName = getDisplayNameByUserUUID(
    stateUI.signedInUser,
    stateUsersCatalogFish.users
  );

  const handleEditUserProfile = async (displayName: string) => {
    const isUserProfileEdited = await editUserProfile(pond)(
      stateUsersCatalogFish.users,
      stateUI.signedInUser,
      displayName
    );
    if (isUserProfileEdited === true) {
      dispatch(closeSectionRight());
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      const isMessagedSent = await sendMessageToChannel(pond)('main')(
        stateUI.signedInUser
      )({ content });
    } catch (err) {
      console.error(err); // TODO show in UI instead
    }
  };

  const messages = mapPublicMessagesToUI(stateChannelMainFish.messages);

  return (
    <div>
      <TopBar userDisplayName={userDisplayName ?? ''} />
      <div>left - main side bar here</div>
      <div>
        <Channel messages={messages} />
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
