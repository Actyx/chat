import React, { FC, useContext } from 'react';
import { closeDialog } from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';
import { AddChannel } from './AddChannel';

type Props = Readonly<{}>;

export const AddChannelDialog: FC<Props> = () => {
  const dispatch = useContext(DispatchContextUI);

  const handleAddChannel = (name: string, description: string) => {
    dispatch(closeDialog());
    // TODO if description is mepty pass undefined
  };

  return (
    <div>
      <h2>Add Channel</h2>
      <AddChannel addChannel={handleAddChannel} />
    </div>
  );
};
