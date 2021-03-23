import { createContext } from 'react';
import { Dispatcher } from './actions-types';

export const DispatchContext = createContext<Dispatcher>(undefined!);
