import { Milliseconds } from '@actyx/pond';
import { MessageId } from '../../../business-logic/message/types';
import { Message } from './Message';

type MessageUI = Readonly<{
  messageId: string;
  createdOn: Milliseconds;
  editedOn?: Milliseconds;
  senderDisplayName: string;
  isHidden: boolean;
  content: string;
  canEdit: boolean;
  canHide: boolean;
}>;

export type MessagesUI = ReadonlyArray<MessageUI>;

type Props = Readonly<{
  channelName: string;
  channelDescription: string;
  messages: ReadonlyArray<MessageUI>;
  editMessage: (messageId: MessageId, content: string) => void;
  hideMessage: (messageId: MessageId) => void;
}>;

export const Channel = ({
  channelName,
  channelDescription,
  messages,
  editMessage,
  hideMessage,
}: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <h2>
        {channelName} {channelDescription}
      </h2>
      {messages.map((m: MessageUI) => (
        <Message
          key={m.messageId}
          messageId={m.messageId}
          createdOn={m.createdOn}
          editedOn={m.editedOn}
          senderDisplayName={m.senderDisplayName}
          isHidden={m.isHidden}
          content={m.content}
          canEdit={m.canEdit}
          canHide={m.canHide}
          editMessage={editMessage}
          hideMessage={hideMessage}
        />
      ))}
    </div>
  );
};
