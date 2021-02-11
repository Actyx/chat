import { ChannelId } from '../../business-logic/message/types';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';
import {
  ActionType,
  AddSignedInUser,
  GoToAuthenticationScreen,
  EditSectionRight,
  SectionRight,
  SignOutActiveUser,
  GoToChatScreen,
  OpenChannelsCatalogSection,
  OpenChannelSection,
} from './types';

export const goToAutheticationScreen = (): GoToAuthenticationScreen => ({
  type: ActionType.GoToAuthenticationScreen,
});

export const goToChatScreen = (): GoToChatScreen => ({
  type: ActionType.GoToChatScreen,
});

export const openChannelsCatalogSection = (): OpenChannelsCatalogSection => ({
  type: ActionType.OpenChannelsCatalogSection,
});

export const openChannelSection = (
  channelId: ChannelId
): OpenChannelSection => ({
  type: ActionType.OpenChannelSection,
  payload: {
    channelId,
  },
});

export const addSignedInUser = (signedInUser: UserUUID): AddSignedInUser => ({
  type: ActionType.AddSignedInUser,
  payload: {
    signedInUser,
  },
});

export const openUserProfileEditSection = (): EditSectionRight => ({
  type: ActionType.EditSectionRight,
  payload: {
    section: SectionRight.UserProfileEdit,
  },
});

export const closeSectionRight = (): EditSectionRight => ({
  type: ActionType.EditSectionRight,
  payload: {
    section: SectionRight.None,
  },
});

export const signOutActiveUser = (): SignOutActiveUser => ({
  type: ActionType.SignOutActiveUser,
});
