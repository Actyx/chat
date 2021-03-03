import { useState } from 'react';
import { FormEventElement, InputChangeEvent } from '../../utils/ui-event-types';

type Props = Readonly<{
  addMessage: (content: string) => void;
}>;

export const MessageInput = ({ addMessage }: Props) => {
  const [message, setMessage] = useState<string>('');

  const handleChangeContent = (e: InputChangeEvent) =>
    setMessage(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    addMessage(message);
    setMessage('');
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChangeContent} />
        <input type="submit" value="Send message" />
      </form>
    </div>
  );
};
