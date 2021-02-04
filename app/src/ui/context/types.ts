export type Screens = 'authentication' | 'chat';

export type StateUI = Readonly<{
  screen: Screens;
}>;

export enum ActionType {
  EditScreen = 'EditScreen',
}

export type EditScreenAction = Readonly<{
  type: ActionType.EditScreen;
  payload: {
    screen: Screens;
  };
}>;

export type Action = EditScreenAction;
