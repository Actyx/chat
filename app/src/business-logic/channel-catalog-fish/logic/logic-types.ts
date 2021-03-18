import { LogicResult } from '../../common/logic-types';
import {
  ChannelAddedEvent,
  ChannelProfileEditedEvent,
  ChannelArchivedEvent,
  ChannelUnarchiveEvent,
  ChannelAssociatedUserEvent,
  ChannelDissociatedUserEvent,
} from '../types';

export type AddChannelLogicResult = LogicResult<ChannelAddedEvent, void>;

export type EditChannelLogicResult = LogicResult<ChannelProfileEditedEvent>;

export type ArchiveChannelLogicResult = LogicResult<ChannelArchivedEvent, void>;

export type UnarchiveChannelLogicResult = LogicResult<ChannelUnarchiveEvent>;

export type AssociateUserToChannelLogicResult = LogicResult<ChannelAssociatedUserEvent>;

export type DissociateUserChannelLogicResult = LogicResult<ChannelDissociatedUserEvent>;

export type AddDefaultChannelIfDoesNotExistLogicResult = LogicResult<ChannelAddedEvent>;
