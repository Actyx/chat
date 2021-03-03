import classNames from 'classnames';
import { useContext } from 'react';
import { mkColor } from '../utils/ui-colors';
import { LogoutIcon } from '../common/Icons/LogoutIcon';
import { Typography } from '../common/Typography/Typography';
import { ButtonLink } from '../common/ButtonLink/ButtonLink';
import {
  showUserProfileEditSection,
  signOutActiveUser,
} from '../ui-state-manager/actions';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  userDisplayName: string;
}>;

export const TopBar = ({ userDisplayName }: Props) => {
  const dispatch = useContext(DispatchContextUI);

  const handleEditUserProfile = () => dispatch(showUserProfileEditSection());

  const handleSignOut = () => dispatch(signOutActiveUser());

  const style = classNames(
    'w-full',
    'flex justify-end items-center',
    'space-x-3',
    'h-10',
    'pl-3 pr-3',
    mkColor('bg')('gray-medium'),
    'border-solid border-b border-gray-600'
  );

  return (
    <div className={style}>
      <ButtonLink type="button" click={handleEditUserProfile}>
        <Typography color="gray-light">{userDisplayName}</Typography>
      </ButtonLink>
      <ButtonLink type="button" click={handleSignOut}>
        <LogoutIcon color="gray-light" />
      </ButtonLink>
    </div>
  );
};
