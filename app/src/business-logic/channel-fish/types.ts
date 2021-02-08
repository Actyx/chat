import { PublicMessage } from '../message/types';

//#region State
export type Messages = PublicMessage[];

export type ChannelFishState = {
  messages: Messages;
};

//#endregion
