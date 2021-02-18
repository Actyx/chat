import { FC } from 'react';
import { EditChannel } from './EditChannel';

type Props = Readonly<{
  currentName: string;
  currentDescription: string;
  messageError?: string;
  messageInvalid?: string;
  editChannel: (name: string, description: string) => void;
  closeDialog: () => void;
}>;

export const EditChannelDialogContainer: FC<Props> = ({
  currentName,
  currentDescription,
  messageError,
  messageInvalid,
  editChannel,
  closeDialog,
}) => {
  return (
    <div>
      {messageError}
      <EditChannel
        currentName={currentName}
        currentDescription={currentDescription}
        editChannel={editChannel}
        messageInvalid={messageInvalid}
      />
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};
