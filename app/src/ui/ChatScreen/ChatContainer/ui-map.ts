import { Timestamp } from '@actyx/pond';
import {
  canUserHideMessage,
  doesMessageBelongToUser,
} from '../../../business-logic/channel-fish/logic';
import { PublicMessages } from '../../../business-logic/channel-fish/types';
import { isUserAssociatedToChannel } from '../../../business-logic/channels-catalog-fish/logic';
import { Channels } from '../../../business-logic/channels-catalog-fish/types';
import { PublicMessage } from '../../../business-logic/message/types';
import { isUserUUIDRegistered } from '../../../business-logic/users-catalog-fish/logic';
import {
  Users,
  UserUUID,
} from '../../../business-logic/users-catalog-fish/types';
import { MessagesUI } from '../Channel/Channel';
import { ChannelsOverview } from '../ChannelsCatalog/ChannelsCatalog';
import { ChannelsSimpleList } from '../Sidebar/Sidebar';

export const mapPublicMessagesToChannelUI = (
  messages: PublicMessages,
  users: Users,
  signedInUser: UserUUID
): MessagesUI =>
  messages.map((m: PublicMessage) => {
    const senderDisplayName =
      getDisplayNameByUser(m.userUUID, users) ?? 'user not found';
    const canEdit = doesMessageBelongToUser(signedInUser, m);
    const canHide = canUserHideMessage(signedInUser, m);
    return {
      messageId: m.messageId,
      createdOn: Timestamp.toMilliseconds(m.createdOn),
      editedOn: m.editedOn && Timestamp.toMilliseconds(m.editedOn),
      senderDisplayName,
      isHidden: m.isHidden,
      content: m.content,
      canEdit,
      canHide,
    };
  });

export const mapChannelsToSidebarUI = (
  channels: Channels
): ChannelsSimpleList => {
  return Object.values(channels).map((x) => ({
    channelId: x.profile.channelId,
    name: x.profile.name,
  }));
};

export const mapChannelsToChannelCatalogUI = (
  channels: Channels,
  users: Users,
  userUUID: UserUUID
): ChannelsOverview =>
  Object.values(channels).map((channel) => {
    const createdBy = getDisplayNameByUser(channel.profile.createdBy, users);
    const editedBy =
      channel.profile.editedBy &&
      getDisplayNameByUser(channel.profile.editedBy, users);
    const usersAssociatedTotal = channel.users.length;
    const isSignedInUserAssociated = isUserAssociatedToChannel(
      userUUID,
      channel.profile.channelId,
      channels
    );

    return {
      ...channel.profile,
      createdBy,
      editedBy,
      usersAssociatedTotal,
      isSignedInUserAssociated,
    };
  });

export const getDisplayNameByUser = (
  userUUID: UserUUID,
  users: Users
): string | undefined => {
  const isRegister = isUserUUIDRegistered(userUUID, users);
  if (isRegister) {
    return users[userUUID].displayName;
  } else {
    return undefined;
  }
};

export const getVisiblePublicMessages = (messages: PublicMessages) =>
  messages.filter((m) => m.isHidden === false);