import cn from 'classnames';
import React, { useState } from 'react';
import { ButtonArea } from '../../../common/ButtonArea/ButtonArea';
import {
  FormEventElement,
  TextAreaChangeEvent,
} from '../../../utils/element-events';

type MessageInputProps = Readonly<{
  channelName: string;
  addMessage: (content: string) => void;
}>;

export const MessageInput = ({
  channelName,
  addMessage,
}: MessageInputProps) => {
  const [message, setMessage] = useState<string>('');

  const isMessageEmpty = message.length === 0;

  const handleChangeContent = (e: TextAreaChangeEvent) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEventElement) => {
    addMessage(message);
    setMessage('');
    e.preventDefault();
  };

  const stylesButton = cn(
    'flex items-center justify-center',
    'w-8 h-8 rounded',
    'transform rotate-90',
    {
      'bg-gray-50': isMessageEmpty,
      'bg-green-700 hover:bg-green-600': !isMessageEmpty,
    }
  );
  const stylesIcon = cn('h-5 w-5', {
    'text-gray-300': isMessageEmpty,
    'text-white': !isMessageEmpty,
  });

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
            <ButtonArea type="submit">
              <div className={stylesButton}>
                <svg
                  className={stylesIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </ButtonArea>
          </div>
        </div>
      </form>
    </div>
  );
};
