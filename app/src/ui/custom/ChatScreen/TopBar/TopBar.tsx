import classNames from 'classnames';
import { mkColor } from '../../../utils/colors';
import { LogoutIcon } from '../../../common/Icons/LogoutIcon';
import { Typography } from '../../../common/Typography/Typography';
import { ButtonArea } from '../../../common/ButtonArea/ButtonArea';

type Props = Readonly<{
  userDisplayName: string;
  editUserProfile: () => void;
  signOut: () => void;
}>;

export const TopBar = ({
  userDisplayName,
  editUserProfile,
  signOut,
}: Props) => {
  const styles = classNames(
    'w-full',
    'flex justify-end items-center',
    'space-x-3',
    'h-10',
    'pl-3 pr-3',
    mkColor('bg')('gray-medium'),
    'border-solid border-b border-gray-600'
  );

  return (
    <div className={styles}>
      <ButtonArea type="button" click={editUserProfile}>
        <Typography color="gray-light">{userDisplayName}</Typography>
      </ButtonArea>
      <ButtonArea type="button" click={signOut}>
        <LogoutIcon color="gray-light" />
      </ButtonArea>
    </div>
  );
};
