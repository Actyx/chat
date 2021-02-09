import { Timestamp } from '@actyx/pond';
import {
  ReadonlyArrayOfOne,
  ReadonlyArrayOfOneOrMore,
} from '../../common/utility-types';

//#region Types

type MessageId = string;

type ChannelId = string;

type SenderId = string;

type RecipientId = string;
type PrivateRecipientsIds = ReadonlyArrayOfOne<RecipientId>;
export type PublicRecipientsIds = ReadonlyArrayOfOneOrMore<RecipientId>;

type MediumId = string;
type MediasIds = ReadonlyArrayOfOneOrMore<MediumId>;

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
    channel: ChannelId;
    recipientsIds?: PublicRecipientsIds;
  }>;

//#endregion
//region Message Events

export enum MessageEventType {
  PrivateMessageAdded = 'PrivateMessageAdded',
  PublicMessageAdded = 'PublicMessageAdded',
  MessageHidden = 'MessageHidden',
  MessageContentEdited = 'MessageContentEdited',
  PublicMessageRecipientsEdited = 'PublicMessageRecipientsEdited',
  MessageMediumEdited = 'MessageMediumEdited',
}

export type PrivateMessageAddedEvent = {
  type: MessageEventType.PrivateMessageAdded;
  payload: Omit<PrivateMessage, 'editedOn'>;
};

export type PublicMessageAddedEvent = {
  type: MessageEventType.PublicMessageAdded;
  payload: Omit<PublicMessage, 'editedOn'>;
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
