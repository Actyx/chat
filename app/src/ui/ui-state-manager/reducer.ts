import { DEFAULT_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import { ANONYMOUS_USER } from '../../business-logic/user-catalog-fish/types';
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
    case ActionType.ShowChannelsCatalogSection:
      return {
        ...state,
        sectionCenter: SectionCenter.ChannelsCatalog,
      };
    case ActionType.ShowChannelSection:
      return {
        ...state,
        sectionCenter: SectionCenter.Channel,
        activeChannelId: action.payload.channelId,
      };
    case ActionType.AddSignedInUser:
      return {
        ...state,
        userUUID: action.payload.userUUID,
        activeChannelId: DEFAULT_CHANNEL.channelId,
      };
    case ActionType.EditSectionRight:
      return {
        ...state,
        sectionRight: action.payload.section,
      };
    case ActionType.SignOutActiveUser:
      return {
        ...state,
        userUUID: ANONYMOUS_USER,
        activeChannelId: DEFAULT_CHANNEL.channelId,
        screen: Screens.Authentication,
      };
    case ActionType.ShowAddChannelDialog:
      return {
        ...state,
        dialog: Dialogs.AddChannel,
      };
    case ActionType.HideDialog:
      return {
        ...state,
        dialog: Dialogs.None,
      };
    default:
      return state;
  }
};
