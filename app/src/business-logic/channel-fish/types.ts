import { LogicResult, LogicResultUI } from '../common/logic-types';
import { PublicMessage, PublicMessageEvent } from '../message/types';

export type PublicMessages = PublicMessage[];

export type ChannelFishState = {
  messages: PublicMessages;
};

export type EditMessageInChannelResult = LogicResult<PublicMessageEvent, void>;

export type EditMessageInChannelResultUI = LogicResultUI<void>;
