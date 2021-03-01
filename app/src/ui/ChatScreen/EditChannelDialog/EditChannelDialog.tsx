import { EditChannel } from './EditChannel';

type Props = Readonly<{
  currentName: string;
  currentDescription: string;
  messageError?: string;
  messageInvalid?: string;
  editChannel: (name: string, description: string) => void;
  closeDialog: () => void;
}>;

export const EditChannelDialog = ({
  currentName,
  currentDescription,
  messageError,
  messageInvalid,
  editChannel,
  closeDialog,
}: Props) => {
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
