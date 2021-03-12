import { ButtonTextLink } from '../../common/ButtonTextLink/ButtonTextLink';
import { Typography } from '../../common/Typography/Typography';

type CreateAccountProps = Readonly<{
  createAccount: () => void;
}>;

export const CreateAccount = ({ createAccount }: CreateAccountProps) => {
  return (
    <div className="absolute top-9 right-9">
      <Typography size="sm" tag="div" color="gray-medium" align="right">
        New to this chat?
      </Typography>
      <ButtonTextLink click={createAccount}>Create an account</ButtonTextLink>
    </div>
  );
};
