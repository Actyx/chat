import { ReactChild, useReducer, createContext } from 'react';
import { DEFAULT_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import { ANONYMOUS_USER } from '../../business-logic/user-catalog-fish/types';
import { Dispatcher } from './actions-types';
import { reducer } from './reducer';
import {
  Dialogs,
  Screens,
  SectionCenter,
  SectionRight,
  StateUI,
} from './state-types';

const inititialState: StateUI = {
  screen: Screens.Authentication,
  dialog: Dialogs.None,
  userUUID: ANONYMOUS_USER,
  sectionRight: SectionRight.None,
  sectionCenter: SectionCenter.Channel,
  activeChannelId: DEFAULT_CHANNEL.channelId,
};

export const StateContextUI = createContext(inititialState);

export const DispatchContextUI = createContext<Dispatcher>(undefined!);

export const UIStateManager = ({
  children,
}: Readonly<{ children: ReactChild }>) => {
  const [stateUI, dispatch] = useReducer(reducer, inititialState);

  return (
    <DispatchContextUI.Provider value={dispatch}>
      <StateContextUI.Provider value={stateUI}>
        {children}
      </StateContextUI.Provider>
    </DispatchContextUI.Provider>
  );
};
