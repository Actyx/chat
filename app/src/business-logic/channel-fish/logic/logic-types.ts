import { LogicResult, LogicResultUI } from '../../common/logic-types';
import { PublicMessageEvent } from '../../message/types';

export type AddMessageToChannelResult = LogicResult<PublicMessageEvent, void>;

export type AddMessageToChannelResultUI = LogicResultUI<void>;

export type EditMessageInChannelResult = LogicResult<PublicMessageEvent, void>;

export type EditMessageInChannelResultUI = LogicResultUI<void>;

export type HideMessageFromChannelResult = LogicResult<
  PublicMessageEvent,
  void
>;

export type HideMessageFromChannelResultUI = LogicResultUI<void>;
