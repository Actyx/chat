import { HashtagIcon } from '../../common/Icons/HashtagIcon';
import { Typography } from '../../common/Typography/Typography';
import { UsersListUI } from './Sidebar';
import { Row } from './Row';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';

type Props = Readonly<{
  users: UsersListUI;
  selectUser: (userUUID: UserUUID) => void;
}>;

export const UsersList = ({ users, selectUser }: Props) => {
  return (
    <>
      {users.map((x) => {
        return (
          <Row key={x.userUUID} onClick={() => selectUser(x.userUUID)}>
            <div className="flex items-center pl-4 space-x-2">
              <HashtagIcon size="sm" color="gray-light" />
              <Typography
                tag="div"
                size="base"
                color="gray-light"
                weight="normal"
              >
                {x.name}
              </Typography>
            </div>
          </Row>
        );
      })}
    </>
  );
};
