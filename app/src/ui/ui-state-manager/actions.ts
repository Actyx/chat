import { ActionType, EditScreenAction, Screens } from './types';

export const goToScreenChat = (): EditScreenAction => ({
  type: ActionType.EditScreen,
  payload: {
    screen: Screens.Chat,
  },
});
