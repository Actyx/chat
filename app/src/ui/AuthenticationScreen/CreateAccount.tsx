type CreateAccountProps = Readonly<{
  createAccount: () => void;
}>;

export const CreateAccount = ({ createAccount }: CreateAccountProps) => {
  return (
    <div className="absolute top-9 right-9 text-sm text-gray-700 text-right">
      <div>New to this chat?</div>
      <div
        className="font-semibold no-underline text-blue-700 hover:text-blue-900 hover:underline"
        onClick={createAccount}
      >
        Create an account
      </div>
    </div>
  );
};
