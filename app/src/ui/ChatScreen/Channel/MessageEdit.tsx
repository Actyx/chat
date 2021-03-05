import { useState } from 'react';
import {
  FormEventElement,
  TextAreaChangeEvent,
} from '../../utils/ui-event-types';

export type MessageEditProps = Readonly<{
  currentContent: string;
  editContent: (content: string) => void;
}>;

export const MessageEdit = ({
  currentContent,
  editContent,
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
      <textarea
        rows={2}
        placeholder="Edit message"
        className="rounded w-full resize-none"
        required
        value={content}
        onChange={handleChangeContent}
      />
      <input type="submit" value="Save changes" />
    </form>
  );
};
