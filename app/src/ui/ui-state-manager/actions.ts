import { ChannelId } from '../../business-logic/message/types';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import {
  ActionType,
  AddSignedInUser,
  GoToAuthenticationScreen,
  EditSectionRight,
  SectionRight,
  SignOutActiveUser,
  GoToChatScreen,
  ShowChannelsCatalogSection,
  ShowChannelSection,
  ShowAddChannelDialog,
  HideDialog,
  ShowEditChannelDialog,
} from './types';

export const goToAutheticationScreen = (): GoToAuthenticationScreen => ({
  type: ActionType.GoToAuthenticationScreen,
});

export const goToChatScreen = (): GoToChatScreen => ({
  type: ActionType.GoToChatScreen,
});

export const showChannelsCatalogSection = (): ShowChannelsCatalogSection => ({
  type: ActionType.ShowChannelsCatalogSection,
});

export const showChannelSection = (
  channelId: ChannelId
): ShowChannelSection => ({
  type: ActionType.ShowChannelSection,
  payload: {
    channelId,
  },
});

export const addSignedInUser = (userUUID: UserUUID): AddSignedInUser => ({
  type: ActionType.AddSignedInUser,
  payload: {
    userUUID,
  },
});

export const showUserProfileEditSection = (): EditSectionRight => ({
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

// FIXME peraphs use a more generic fn;
export const showAddChannelDialog = (): ShowAddChannelDialog => ({
  type: ActionType.ShowAddChannelDialog,
});

export const showEditChannelDialog = (): ShowEditChannelDialog => ({
  type: ActionType.ShowEditChannelDialog,
});

export const hideDialog = (): HideDialog => {
  console.log('HIDE DIALGO');
  return {
    type: ActionType.HideDialog,
  };
};
