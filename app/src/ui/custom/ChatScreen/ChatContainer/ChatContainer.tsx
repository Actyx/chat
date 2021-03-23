import React, { useEffect, useState } from 'react';
import { Chat } from './Chat';
import { Alert } from '../../../common/Alert/Alert';
import { usePond } from '@actyx-contrib/react-pond';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { wire } from '../../../../business-logic/common/logic-wire';
import { addDefaultChannelIfDoesNotExist } from '../../../../business-logic/channel-catalog-fish/logic/addDefaultChannelIfDoesNotExist';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { useFish } from '../../../utils/use-fish';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import {
  Dialogs,
  SectionCenter,
  SectionRight,
} from '../../../state-manager/state-types';
import { ChannelId } from '../../../../business-logic/message/types';

type ChatContainerProps = Readonly<{
  userUUID: UserUUID;
  activeChannelId: ChannelId;
  dialog: Dialogs;
  sectionRight: SectionRight;
  sectionCenter: SectionCenter;
}>;

export const ChatContainer = ({
  userUUID,
  activeChannelId,
  dialog,
  sectionRight,
  sectionCenter,
}: ChatContainerProps) => {
  const pond = usePond();

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  useEffect(() => {
    const performAddDefaultChannel = wire(
      pond,
      ChannelCatalogFish
    )(addDefaultChannelIfDoesNotExist);

    const mainChannel = async () => {
      performAddDefaultChannel().catch(setPondErrorMessage);
    };

    mainChannel();
  }, [pond, userUUID, userCatalogFishState.users]);

  return pondErrorMessage ? (
    <Alert variant="danger">{pondErrorMessage}</Alert>
  ) : (
    <Chat
      userUUID={userUUID}
      activeChannelId={activeChannelId}
      dialog={dialog}
      sectionRight={sectionRight}
      sectionCenter={sectionCenter}
    />
  );
};
