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

export type EditChannelLogicResult = LogicResult<
  ChannelProfileEditedEvent,
  void
>;

export type ArchiveChannelLogicResult = LogicResult<ChannelArchivedEvent, void>;

export type UnarchiveChannelLogicResult = LogicResult<
  ChannelUnarchiveEvent,
  void
>;

export type AssociateUserToChannelLogicResult = LogicResult<
  ChannelAssociatedUserEvent,
  void
>;

export type DissociateUserChannelLogicResult = LogicResult<
  ChannelDissociatedUserEvent,
  void
>;

export type AddDefaultChannelIfDoesNotExistLogicResult = LogicResult<
  ChannelAddedEvent,
  void
>;
