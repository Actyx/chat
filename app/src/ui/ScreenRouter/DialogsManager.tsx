import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { AddChannelDialog } from '../ChatScreen/AddChannelDialog/AddChannelDialogContainer';
import { Dialogs } from '../ui-state-manager/types';
import { StateContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  pond: Pond;
}>;

export const DialogsManager: FC<Props> = ({ pond }) => {
  const stateUI = useContext(StateContextUI);

  const renderDialog = () => {
    switch (stateUI.dialog) {
      case Dialogs.None:
        return undefined;
      case Dialogs.AddChannel:
        return <AddChannelDialog pond={pond} />;
    }
  };
  return <div>{renderDialog()}</div>;
};
