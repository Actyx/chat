import { Milliseconds } from '@actyx/pond';
import { useState } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { FormEvent, InputChangeEvent } from '../../../common/ui-types';

export type MessageUI = Readonly<{
  messageId: string;
  createdOn: Milliseconds;
  editedOn?: Milliseconds;
  senderDisplayName: string;
  isHidden: boolean;
  content: string;
  canEdit: boolean;
  canHide: boolean;
}>;

type Props = MessageUI &
  Readonly<{
    editMessage: (messageId: MessageId, content: string) => void;
    hideMessage: (messageId: MessageId) => void;
  }>;

export const Message = ({
  messageId,
  createdOn,
  editedOn,
  senderDisplayName,
  isHidden,
  content,
  canEdit,
  canHide,
  editMessage,
  hideMessage: hideMesage,
}: Props) => {
  const handleEditMessage = (content: string) =>
    editMessage(messageId, content);

  const handleHideMessage = () => hideMesage(messageId);

  return (
    <div>
      {editedOn && (
        <div>
          <i>EDITED</i>
        </div>
      )}
      messageId: {messageId}
      <br />
      timestamp: {editedOn ?? createdOn}
      <br />
      senderDisplayName: {senderDisplayName}
      <br />
      isHidden: {isHidden ? 'true' : 'false'}
      <br />
      content: {content}
      <br />
      {canEdit && <EditMessage editContent={handleEditMessage} />}
      {canHide && <button onClick={handleHideMessage}>Hide</button>}
      <hr />
    </div>
  );
};

const EditMessage = ({
  editContent,
}: Readonly<{
  editContent: (content: string) => void;
}>) => {
  const [content, setContent] = useState<string>('');

  const handleChangeContent = (e: InputChangeEvent) =>
    setContent(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    editContent(content);
    setContent('');
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Edit:</label>
      <input
        type="text"
        required
        value={content}
        onChange={handleChangeContent}
      />
      <input type="submit" value="Edit message" />
    </form>
  );
};
