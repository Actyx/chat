import { useState } from 'react';
import { FormEventElement, InputChangeEvent } from '../../utils/ui-event-types';

export type MessageEditProps = Readonly<{
  currentContent: string;
  editContent: (content: string) => void;
}>;

export const MessageEdit = ({
  editContent,
}: Readonly<{
  editContent: (content: string) => void;
}>) => {
  const [content, setContent] = useState<string>('');

  const handleChangeContent = (e: InputChangeEvent) =>
    setContent(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    editContent(content);
    setContent('');
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        value={content}
        onChange={handleChangeContent}
      />
      <input type="submit" value="Save changes" />
    </form>
  );
};
