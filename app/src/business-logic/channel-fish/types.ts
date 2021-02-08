import { Timestamp } from '@actyx/pond';
import {
  ReadonlyArrayOfOne,
  ReadonlyArrayOfOneOrMore,
} from '../common/utility-types';

type MessageId = string;

type ChannelId = string;

type SenderId = string;

type RecipientId = string;

type MediumId = string;
type MediasIds = ReadonlyArrayOfOneOrMore<MediumId>;

type BaseMessage = Readonly<{
  messageId: MessageId;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  isHidden: boolean;
  senderId: SenderId;
  content: string;
  mediasIds?: MediasIds;
}>;

export type PrivateMessage = BaseMessage &
  Readonly<{
    recipientsIds: ReadonlyArrayOfOne<RecipientId>;
  }>;

export type PublicMessage = BaseMessage &
  Readonly<{
    channel: ChannelId;
    recipientsIds?: ReadonlyArrayOfOneOrMore<RecipientId>;
  }>;
