import { Button } from '../common/Button/Button';

type CreateAccountProps = Readonly<{
  createAccount: () => void;
}>;

export const CreateAccount = ({ createAccount }: CreateAccountProps) => {
  return (
    <div className="absolute top-9 right-9 text-sm text-gray-700 text-right">
      <div>New to this chat?</div>
      <Button click={createAccount}>Create an account</Button>
    </div>
  );
};
