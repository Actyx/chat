import { Timestamp } from '@actyx/pond';
import {
  ReadonlyArrayOfOne,
  ReadonlyArrayOfOneOrMore,
} from '../../common/types';
import { UserUUID } from '../user-catalog-fish/types';

//#region Types

export type MessageId = string;

export type ChannelId = string;

type RecipientId = string;
type PrivateRecipientIds = ReadonlyArrayOfOne<RecipientId>;
export type PublicRecipientIds = ReadonlyArrayOfOneOrMore<RecipientId>;

type MediumId = string;
export type MediaIds = ReadonlyArrayOfOneOrMore<MediumId>;

type BaseMessage = {
  messageId: MessageId;
  createdBy: UserUUID;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  isHidden: boolean;
  content: string;
  mediaIds?: MediaIds;
};

export type PrivateMessage = BaseMessage &
  Readonly<{
    recipientIds: PrivateRecipientIds;
  }>;

export type PublicMessage = BaseMessage &
  Readonly<{
    channelId: ChannelId;
    recipientIds?: PublicRecipientIds;
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
  userUUID: UserUUID;
  content: string;
  mediaIds?: MediaIds;
  recipientIds: PrivateRecipientIds;
}>;
export type PrivateMessageAddedEvent = {
  type: MessageEventType.PrivateMessageAdded;
  payload: PrivateMessageAddedEventPayload;
};

export type PublicMessageAddedEventPaylod = Readonly<{
  messageId: MessageId;
  createdBy: UserUUID;
  channelId: ChannelId;
  content: string;
  mediaIds?: MediaIds;
  recipientIds?: PublicRecipientIds;
}>;
export type PublicMessageAddedEvent = {
  type: MessageEventType.PublicMessageAdded;
  payload: PublicMessageAddedEventPaylod;
};

export type MessageHiddenEvent = {
  type: MessageEventType.MessageHidden;
  payload: {
    messageId: MessageId;
    hiddenBy: UserUUID;
  };
};

export type MessageContentEditedEvent = {
  type: MessageEventType.MessageContentEdited;
  payload: {
    messageId: MessageId;
    content: string;
    editedBy: UserUUID;
  };
};

export type PublicMessageRecipientsEditedEvent = {
  type: MessageEventType.PublicMessageRecipientsEdited;
  payload: {
    messageId: MessageId;
    editedBy: UserUUID;
    recipientIds?: PublicRecipientIds;
  };
};

export type MessageMediumEdited = {
  type: MessageEventType.MessageMediumEdited;
  payload: {
    messageId: MessageId;
    editedBy: UserUUID;
    mediaIds?: MediaIds;
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
