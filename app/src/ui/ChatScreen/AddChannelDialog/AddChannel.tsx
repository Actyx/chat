import { useState } from 'react';
import { FormEventElement, InputChangeEvent } from '../../utils/ui-event-types';

type Props = Readonly<{
  invalidMessage?: string;
  addChannel: (name: string, description: string) => void;
}>;

export const AddChannel = ({ invalidMessage, addChannel }: Props) => {
  const [name, setName] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeDescription = (e: InputChangeEvent) =>
    setDescription(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    addChannel(name, description);
    e.preventDefault();
  };

  return (
    <div>
      <h2>Add Channel</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" required value={name} onChange={handleChangeName} />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={handleChangeDescription}
        />
        <br />
        <input type="submit" value="Add Channel" />
      </form>
      {invalidMessage}
    </div>
  );
};
