import { AddChannel } from './AddChannel';

type Props = Readonly<{
  errorMessage?: string;
  invalidMessage?: string;
  addChannel: (name: string, description: string) => void;
  closeDialog: () => void;
}>;

export const AddChannelDialog = ({
  errorMessage,
  invalidMessage,
  addChannel,
  closeDialog,
}: Props) => {
  return (
    <div>
      {errorMessage}
      <AddChannel addChannel={addChannel} invalidMessage={invalidMessage} />
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};
