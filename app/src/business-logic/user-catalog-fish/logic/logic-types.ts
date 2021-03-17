import { LogicResult, LogicResultUI } from '../../common/logic-types';
import { UserCatalogFishEvent, UserUUID } from '../types';

export type SignUpLogicResult = LogicResult<UserCatalogFishEvent, UserUUID>;

export type SignUpLogicResultUI = LogicResultUI<UserUUID>;

export type EditUserProfileResult = LogicResult<UserCatalogFishEvent, void>;

export type EditUserProfileResultUI = LogicResultUI<void>;
