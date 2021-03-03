import { Timestamp } from '@actyx/pond';
import {
  canUserHideMessage,
  doesMessageBelongToUser,
} from '../../../business-logic/channel-fish/logic';
import { PublicMessages } from '../../../business-logic/channel-fish/types';
import {
  getChannelProfileByChannelId,
  getChannelUsersByChannelId,
  isChannelIdSystemDefault,
  isUserAssociatedToChannel,
} from '../../../business-logic/channel-catalog-fish/logic';
import { Channels } from '../../../business-logic/channel-catalog-fish/types';
import {
  ChannelId,
  PublicMessage,
} from '../../../business-logic/message/types';
import {
  getTotalUsers,
  isUserCreatedBySystem,
  isUserUUIDRegistered,
} from '../../../business-logic/user-catalog-fish/logic';
import {
  Users,
  UserUUID,
} from '../../../business-logic/user-catalog-fish/types';
import { genericSorter, localeComparator } from '../../../common/sorts';
import { isDefined } from '../../../common/filters';
import { MessagesUI } from '../Channel/Channel';
import { ChannelsOverviewUI } from '../ChannelsCatalog/ChannelsCatalog';
import { ChannelsListUI } from '../Sidebar/Sidebar';

export const mapPublicMessagesToChannelUI = (
  messages: PublicMessages,
  users: Users,
  userUUID: UserUUID
): MessagesUI =>
  messages.map((m: PublicMessage) => {
    const senderDisplayName = getDisplayNameByUser(m.createdBy, users) ?? '';
    const canEdit = doesMessageBelongToUser(userUUID, m);
    const canHide = canUserHideMessage(userUUID, m);
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
    const usersAssociated = channel.users
      .map((x: UserUUID) => getDisplayNameByUser(x, users))
      .filter(isDefined);
    const isSystemUser = isUserCreatedBySystem(channel.profile.createdBy);

    return {
      ...channel.profile,
      createdBy,
      editedBy,
      usersAssociatedTotal,
      usersAssociated,
      isSignedInUserAssociated,
      isSystemUser,
    };
  });

export const sortAlphabeticChannelsSidebar = (
  channels: ChannelsListUI
): ChannelsListUI =>
  channels
    .map((x) => x)
    .sort((a, b) =>
      genericSorter(localeComparator, { isDescending: false })(a.name, b.name)
    );

export const sortAlphabeticChannelsOverview = (
  channelsOverview: ChannelsOverviewUI
) =>
  channelsOverview
    .map((x) => x)
    .sort((a, b) =>
      genericSorter(localeComparator, {
        isDescending: false,
      })(a.name, b.name)
    );

export const getDisplayNameByUser = (
  userUUID: UserUUID,
  users: Users
): string => {
  const isRegister = isUserUUIDRegistered(userUUID, users);
  if (isRegister) {
    return users[userUUID].displayName;
  } else if (isUserCreatedBySystem(userUUID)) {
    return 'System';
  } else {
    return '';
  }
};

export const getVisiblePublicMessages = (
  messages: PublicMessages
): PublicMessages => messages.filter((m) => !m.isHidden);

export const getChannelNameAndDescription = (
  channelId: ChannelId,
  channels: Channels
): Readonly<{ channelName: string; channelDescription: string }> => {
  const profile = getChannelProfileByChannelId(channelId, channels);
  return {
    channelName: profile?.name ?? '',
    channelDescription: profile?.description ?? '',
  };
};

export const getTotalUsersNumber = (
  channelId: ChannelId,
  channels: Channels,
  users: Users
): number =>
  isChannelIdSystemDefault(channelId)
    ? getTotalUsers(users)
    : getChannelUsersByChannelId(channelId, channels)?.length ?? 0;
