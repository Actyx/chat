import { UserUUID } from '../../business-logic/users-catalog-fish/types';
import {
  ActionType,
  AddSignedInUser,
  EditScreenAction,
  Screens,
} from './types';

export const goToScreenChat = (): EditScreenAction => ({
  type: ActionType.EditScreen,
  payload: {
    screen: Screens.Chat,
  },
});

export const addSignedInUser = (
  signedInUser: UserUUID
): AddSignedInUser => ({
  type: ActionType.AddSignedInUser,
  payload: {
    signedInUser,
  },
});
