import React, { FC } from 'react';

type Props = Readonly<{
  sendMessage: (content: string) => void;
}>;

export const MessageInput: FC<Props> = ({ sendMessage }) => {
  const [message, setMessage] = React.useState<string>('');

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    sendMessage(message);
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Message:</label>
        <input type="text" value={message} onChange={handleChangeMessage} />
        <input type="submit" value="Send message" />
      </form>
    </div>
  );
};
