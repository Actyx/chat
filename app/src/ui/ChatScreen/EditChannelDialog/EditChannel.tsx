import React, { FC, useState } from 'react';
import { FormEvent, InputChangeEvent } from '../../../common/ui-types';
type Props = Readonly<{
  currentName: string;
  currentDescription: string;
  messageInvalid?: string;
  editChannel: (name: string, description: string) => void;
}>;

export const EditChannel: FC<Props> = ({
  currentName,
  currentDescription,
  messageInvalid,
  editChannel,
}) => {
  const [name, setName] = useState<string>(currentName);

  const [description, setDescription] = useState<string>(currentDescription);

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeDescription = (e: InputChangeEvent) =>
    setDescription(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    editChannel(name, description);
    e.preventDefault();
  };

  return (
    <div>
      <h2>Edit Channel</h2>
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
        <input type="submit" value="Edit Channel" />
      </form>
      {messageInvalid}
    </div>
  );
};
