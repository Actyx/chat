import {
  ActionType,
  EditScreenAction,
  Screens,
} from '../ui-state-manager/types';

export const goToScreenChat = (): EditScreenAction => ({
  type: ActionType.EditScreen,
  payload: {
    screen: Screens.Chat,
  },
});
