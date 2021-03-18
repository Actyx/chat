import { LogicResult, LogicResultUI } from '../../common/logic-types';
import { PublicMessageEvent } from '../../message/types';

export type AddMessageToChannelResult = LogicResult<PublicMessageEvent>;

export type AddMessageToChannelResultUI = LogicResultUI;

export type EditMessageInChannelResult = LogicResult<PublicMessageEvent>;

export type EditMessageInChannelResultUI = LogicResultUI;

export type HideMessageFromChannelResult = LogicResult<PublicMessageEvent>;

export type HideMessageFromChannelResultUI = LogicResultUI;
