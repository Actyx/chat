import { PublicMessage } from '../message/types';

//#region State
export type PublicMessages = PublicMessage[];

export type ChannelFishState = {
  messages: PublicMessages;
};

//#endregion
