import { Timestamp } from '@actyx/pond';
import {
  ReadonlyArrayOfOne,
  ReadonlyArrayOfOneOrMore,
} from '../../common/utility-types';
import { UserUUID } from '../users-catalog-fish/types';

//#region Types

export type MessageId = string;

export type ChannelId = string;

export type SenderId = UserUUID;

type RecipientId = string;
type PrivateRecipientsIds = ReadonlyArrayOfOne<RecipientId>;
export type PublicRecipientsIds = ReadonlyArrayOfOneOrMore<RecipientId>;

type MediumId = string;
export type MediasIds = ReadonlyArrayOfOneOrMore<MediumId>;

type BaseMessage = Readonly<{
  messageId: MessageId;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  senderId: SenderId;
  isHidden: boolean;
  content: string;
  mediasIds?: MediasIds;
}>;

export type PrivateMessage = BaseMessage &
  Readonly<{
    recipientsIds: PrivateRecipientsIds;
  }>;

export type PublicMessage = BaseMessage &
  Readonly<{
    channelId: ChannelId;
    recipientsIds?: PublicRecipientsIds;
  }>;

//#endregion

//region Events

export enum MessageEventType {
  PrivateMessageAdded = 'PrivateMessageAdded',
  PublicMessageAdded = 'PublicMessageAdded',
  MessageHidden = 'MessageHidden',
  MessageContentEdited = 'MessageContentEdited',
  PublicMessageRecipientsEdited = 'PublicMessageRecipientsEdited',
  MessageMediumEdited = 'MessageMediumEdited',
}

type PrivateMessageAddedEventPayload = Readonly<{
  messageId: MessageId;
  senderId: SenderId;
  content: string;
  mediasIds?: MediasIds;
  recipientsIds: PrivateRecipientsIds;
}>;
export type PrivateMessageAddedEvent = {
  type: MessageEventType.PrivateMessageAdded;
  payload: PrivateMessageAddedEventPayload;
};

export type PublicMessageAddedEventPaylod = Readonly<{
  messageId: MessageId;
  senderId: SenderId;
  channelId: ChannelId;
  content: string;
  mediasIds?: MediasIds;
  recipientsIds?: PublicRecipientsIds;
}>;
export type PublicMessageAddedEvent = {
  type: MessageEventType.PublicMessageAdded;
  payload: PublicMessageAddedEventPaylod;
};

export type MessageHiddenEvent = {
  type: MessageEventType.MessageHidden;
  payload: {
    messageId: MessageId;
    editedOn: Timestamp;
    isHidden: true;
  };
};

export type MessageContentEditedEvent = {
  type: MessageEventType.MessageContentEdited;
  payload: {
    messageId: MessageId;
    editedOn: Timestamp;
    content: string;
  };
};

export type PublicMessageRecipientsEditedEvent = {
  type: MessageEventType.PublicMessageRecipientsEdited;
  payload: {
    messageId: MessageId;
    editedOn: Timestamp;
    recipientsIds?: PublicRecipientsIds;
  };
};

export type MessageMediumEdited = {
  type: MessageEventType.MessageMediumEdited;
  payload: {
    messageId: MessageId;
    editedOn: Timestamp;
    mediasIds?: MediasIds;
  };
};

export type PublicMessageEvent =
  | PublicMessageAddedEvent
  | MessageHiddenEvent
  | MessageContentEditedEvent
  | PublicMessageRecipientsEditedEvent
  | MessageMediumEdited;

export type PrivateMessageEvent =
  | PrivateMessageAddedEvent
  | MessageHiddenEvent
  | MessageContentEditedEvent
  | MessageMediumEdited;
