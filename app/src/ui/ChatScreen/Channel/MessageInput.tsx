import React, { useState } from 'react';
import { ButtonLink } from '../../common/ButtonLink/ButtonLink';
import {
  FormEventElement,
  TextAreaChangeEvent,
} from '../../utils/ui-event-types';

type MessageInputProps = Readonly<{
  channelName: string;
  addMessage: (content: string) => void;
}>;

export const MessageInput = ({
  channelName,
  addMessage,
}: MessageInputProps) => {
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
        <div className="flex space-x-2">
          <textarea
            rows={2}
            placeholder={`Message #${channelName}`}
            className="rounded w-full resize-none"
            value={message}
            onChange={handleChangeContent}
          />
          <div className="flex self-end">
            <ButtonLink type="submit">
              <div className="flex items-center justify-center bg-green-700 hover:bg-green-600 w-8 h-8 rounded transform rotate-90">
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </ButtonLink>
          </div>
        </div>
      </form>
    </div>
  );
};
