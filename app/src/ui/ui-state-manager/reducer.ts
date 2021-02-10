import { MAIN_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import { Action, ActionType, Screens, StateUI } from './types';

export const reducer = (state: StateUI, action: Action): StateUI => {
  switch (action.type) {
    case ActionType.EditScreen:
      return {
        ...state,
        screen: action.payload.screen,
      };
    case ActionType.AddSignedInUser:
      return {
        ...state,
        signedInUserUUID: action.payload.signedInUser,
        activeChannelId: MAIN_CHANNEL,
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
        activeChannelId: undefined,
        screen: Screens.Authentication,
      };
    default:
      return state;
  }
};
