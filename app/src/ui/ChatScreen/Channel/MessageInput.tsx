import React, { FC } from 'react';

type Props = Readonly<{
  addMessage: (content: string) => void;
}>;

export const MessageInput: FC<Props> = ({ addMessage }) => {
  const [message, setMessage] = React.useState<string>('');

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    addMessage(message);
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
