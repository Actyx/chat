import React, { FC, useContext } from 'react';
import { AddChannelDialog } from '../ChatScreen/AddChannelDialog/AddChannelDialogContainer';
import { Dialogs } from '../ui-state-manager/types';
import { StateContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{}>;

const renderDialog = (dialog: Dialogs) => {
  switch (dialog) {
    case Dialogs.None:
      return undefined;
    case Dialogs.AddChannel:
      return <AddChannelDialog />;
  }
};

export const DialogsManager: FC<Props> = () => {
  const stateUI = useContext(StateContextUI);
  return <div>{renderDialog(stateUI.dialog)}</div>;
};
