import { useState } from 'react';
import { FormEvent, InputChangeEvent } from '../../../common/ui-types';

type Props = Readonly<{
  addMessage: (content: string) => void;
}>;

export const MessageInput = ({ addMessage }: Props) => {
  const [message, setMessage] = useState<string>('');

  const handleChangeContent = (e: InputChangeEvent) =>
    setMessage(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    addMessage(message);
    setMessage('');
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Message:</label>
        <input type="text" value={message} onChange={handleChangeContent} />
        <input type="submit" value="Send message" />
      </form>
    </div>
  );
};
