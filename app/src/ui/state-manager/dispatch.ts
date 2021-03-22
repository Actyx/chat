import { createContext } from 'react';
import { Dispatcher } from './actions-types';

export const DispatchContextUI = createContext<Dispatcher>(undefined!);
