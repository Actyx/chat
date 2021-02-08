import { Timestamp } from '@actyx/pond';
import { ReadOnlyArrayOneOrMore } from '../common/type';

type MessageId = string;

type ChannelId = string;

type SenderId = string;

type RecipientId = string;
type RecipientsIds = ReadOnlyArrayOneOrMore<RecipientId>;

type MediumId = string;
type MediasIds = ReadOnlyArrayOneOrMore<MediumId>;

export type Message = Readonly<{
  messageId: MessageId;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  isHidden: boolean;
  channel?: ChannelId;
  senderId: SenderId;
  recipientsIds?: RecipientsIds;
  content: string;
  mediasIds?: MediasIds;
}>;
