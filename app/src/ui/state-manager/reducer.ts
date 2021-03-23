import { DEFAULT_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import { Action, ActionType } from './actions-types';
import { Dialogs, SectionCenter, SectionRight, StateUI } from './state-types';

export const reducer = (state: StateUI, action: Action): StateUI => {
  switch (state.type) {
    case 'anonymous':
      switch (action.type) {
        case ActionType.AddSignedInUser:
          return state;
        case ActionType.GoToChatScreen: {
          return {
            ...state,
            type: 'autheticated',
            dialog: Dialogs.None,
            userUUID: action.payload.userUUID,
            sectionRight: SectionRight.None,
            sectionCenter: SectionCenter.Channel,
            activeChannelId: DEFAULT_CHANNEL.channelId,
          };
        }
        default:
          return state;
      }
    case 'autheticated':
      switch (action.type) {
        case ActionType.GoToAuthenticationScreen:
          return {
            ...state,
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

        case ActionType.EditSectionRight:
          return {
            ...state,
            sectionRight: action.payload.section,
          };
        case ActionType.SignOutActiveUser:
          return {
            ...state,
            type: 'anonymous',
          };
        case ActionType.ShowAddChannelDialog:
          return {
            ...state,
            dialog: Dialogs.AddChannel,
          };
        case ActionType.ShowEditChannelDialog:
          return {
            ...state,
            dialog: Dialogs.EditChannel,
          };
        case ActionType.HideDialog:
          return {
            ...state,
            dialog: Dialogs.None,
          };
        default:
          return state;
      }
  }
};
