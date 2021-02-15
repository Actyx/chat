import React, { FC, useState } from 'react';

type Props = Readonly<{
  addChannel: (name: string, description: string) => void;
}>;

export const AddChannel: FC<Props> = ({ addChannel }) => {
  const [name, setName] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    </div>
  );
};
