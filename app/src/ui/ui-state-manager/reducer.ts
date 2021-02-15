import { MAIN_CHANNEL as DEFAULT_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import {
  Action,
  ActionType,
  Dialogs,
  Screens,
  SectionCenter,
  StateUI,
} from './types';

export const reducer = (state: StateUI, action: Action): StateUI => {
  switch (action.type) {
    case ActionType.GoToAuthenticationScreen:
      return {
        ...state,
        screen: Screens.Authentication,
      };
    case ActionType.GoToChatScreen:
      return {
        ...state,
        screen: Screens.Chat,
      };
    case ActionType.OpenDialogAddChannel:
      return { ...state, dialog: Dialogs.AddChannel };
    case ActionType.CloseDialog:
      return { ...state, dialog: Dialogs.None };
    case ActionType.OpenChannelsCatalogSection:
      return {
        ...state,
        sectionCenter: SectionCenter.ChannelsCatalog,
      };
    case ActionType.OpenChannelSection:
      return {
        ...state,
        sectionCenter: SectionCenter.Channel,
        activeChannelId: action.payload.channelId,
      };
    case ActionType.AddSignedInUser:
      return {
        ...state,
        signedInUserUUID: action.payload.signedInUser,
        activeChannelId: DEFAULT_CHANNEL,
      };
    case ActionType.EditSectionRight:
      return {
        ...state,
        sectionRight: action.payload.section,
      };
    case ActionType.SignOutActiveUser:
      return {
        ...state,
        signedInUserUUID: undefined,
        activeChannelId: DEFAULT_CHANNEL,
        screen: Screens.Authentication,
      };
    default:
      return state;
  }
};
