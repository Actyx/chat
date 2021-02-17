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
import { genericSorter, localeComparator } from '../../../common/sorts';
import { MessagesUI } from '../Channel/Channel';
import { ChannelsOverviewUI } from '../ChannelsCatalog/ChannelsCatalog';
import { ChannelsListUI } from '../Sidebar/Sidebar';

export const mapPublicMessagesToChannelUI = (
  messages: PublicMessages,
  users: Users,
  signedInUser: UserUUID
): MessagesUI =>
  messages.map((m: PublicMessage) => {
    const senderDisplayName =
      getDisplayNameByUser(m.createdBy, users) ?? 'user not found';
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

export const mapChannelsToSidebarUI = (channels: Channels): ChannelsListUI =>
  Object.values(channels).map((x) => ({
    channelId: x.profile.channelId,
    name: x.profile.name,
  }));

export const mapChannelsToChannelCatalogUI = (
  channels: Channels,
  users: Users,
  userUUID: UserUUID
): ChannelsOverviewUI =>
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

export const sortAlphabeticChannelsSidebar = (
  channels: ChannelsListUI
): ChannelsListUI =>
  channels
    .map((x) => x)
    .sort((a, b) =>
      genericSorter(a.name, b.name, localeComparator, { isDescending: false })
    );

export const sortAlphabeticChannelsOverview = (
  channelsOverview: ChannelsOverviewUI
) =>
  channelsOverview
    .map((x) => x)
    .sort((a, b) =>
      genericSorter(a.name, b.name, localeComparator, {
        isDescending: false,
      })
    );

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

export const getVisiblePublicMessages = (
  messages: PublicMessages
): PublicMessages => messages.filter((m) => m.isHidden === false);
