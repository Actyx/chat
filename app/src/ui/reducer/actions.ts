import { ActionType, EditScreenAction } from './types';

export const goToScreenChat = (): EditScreenAction => ({
  type: ActionType.EditScreen,
  payload: {
    screen: 'chat',
  },
});
