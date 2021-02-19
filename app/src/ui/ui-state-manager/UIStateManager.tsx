import { FC, ReactChild, useReducer, createContext } from 'react';
import { MAIN_CHANNEL as DEFAULT_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import { ANONYMOUS_USER } from '../../business-logic/users-catalog-fish/types';
import { reducer } from './reducer';
import {
  Dialogs,
  Dispatcher,
  Screens,
  SectionCenter,
  SectionRight,
  StateUI,
} from './types';

const inititialState: StateUI = {
  screen: Screens.Authentication,
  dialog: Dialogs.None,
  userUUID: ANONYMOUS_USER,
  sectionRight: SectionRight.None,
  sectionCenter: SectionCenter.Channel,
  activeChannelId: DEFAULT_CHANNEL,
};

export const StateContextUI = createContext(inititialState);

export const DispatchContextUI = createContext<Dispatcher>(undefined!);

export const UIStateManager: FC<{ children: ReactChild }> = ({ children }) => {
  const [stateUI, dispatch] = useReducer(reducer, inititialState);

  return (
    <DispatchContextUI.Provider value={dispatch}>
      <StateContextUI.Provider value={stateUI}>
        {children}
      </StateContextUI.Provider>
    </DispatchContextUI.Provider>
  );
};
