import React, { useState } from 'react';
import { ButtonLink } from '../../common/ButtonLink/ButtonLink';
import { PaperAirplane } from '../../common/Icons/PaperAirplane';
import {
  FormEventElement,
  TextAreaChangeEvent,
} from '../../utils/ui-event-types';

type Props = Readonly<{
  addMessage: (content: string) => void;
}>;

export const MessageInput = ({ addMessage }: Props) => {
  const [message, setMessage] = useState<string>('');

  const handleChangeContent = (e: TextAreaChangeEvent) =>
    setMessage(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    addMessage(message);
    setMessage('');
    e.preventDefault();
  };

  return (
    <div className="h-24 p-4 w-full">
      <form onSubmit={handleSubmit}>
        <textarea
          rows={2}
          className="rounded w-11/12"
          value={message}
          onChange={handleChangeContent}
        />
        <ButtonLink type="submit">
          <PaperAirplane />
        </ButtonLink>
      </form>
    </div>
  );
};
