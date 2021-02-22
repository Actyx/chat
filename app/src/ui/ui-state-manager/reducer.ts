import { MAIN_CHANNEL as DEFAULT_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import { ANONYMOUS_USER } from '../../business-logic/user-catalog-fish/types';
import { Action, ActionType, Screens, SectionCenter, StateUI } from './types';

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
        userUUID: ANONYMOUS_USER,
        activeChannelId: DEFAULT_CHANNEL,
        screen: Screens.Authentication,
      };
    default:
      return state;
  }
};
