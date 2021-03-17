import { PublicMessage } from '../message/types';

export type PublicMessages = PublicMessage[];

export type ChannelFishState = {
  messages: PublicMessages;
};
