import React, { useState } from 'react';
import { Button } from '../../../../common/Button/Button';
import {
  FormEventElement,
  TextAreaChangeEvent,
} from '../../../../utils/element-events';

export type MessageEditProps = Readonly<{
  currentContent: string;
  editContent: (content: string) => void;
  close: () => void;
}>;

export const MessageEdit = ({
  currentContent,
  editContent,
  close,
}: MessageEditProps) => {
  const [content, setContent] = useState<string>(currentContent);

  const handleChangeContent = (e: TextAreaChangeEvent) =>
    setContent(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    editContent(content);
    setContent('');
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1">
        <textarea
          rows={2}
          placeholder="Edit message"
          className="rounded w-full resize-none"
          required
          value={content}
          onChange={handleChangeContent}
        />
        <div className="flex space-x-3">
          <Button type="button" size="sm" color="white" click={close}>
            Cancel
          </Button>
          <Button size="sm" color="green">
            Save changes
          </Button>
        </div>
      </div>
    </form>
  );
};
