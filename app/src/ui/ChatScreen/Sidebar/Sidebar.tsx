import React, { FC, useContext } from 'react';
import { MAIN_CHANNEL } from '../../../business-logic/channel-fish/channel-fish';
import {
  openChannelsCatalogSection,
  openChannelSection,
  openDialogAddChannel,
} from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';

type Props = Readonly<{}>;

export const Sidebar: FC<Props> = () => {
  const dispatch = useContext(DispatchContextUI);

  const handleChannelsCatalog = () => dispatch(openChannelsCatalogSection());

  const handleMain = () => dispatch(openChannelSection(MAIN_CHANNEL));

  const handleAddChannel = () => dispatch(openDialogAddChannel());

  return (
    <div>
      Main navigation:
      <ul>
        <li>
          <button onClick={handleChannelsCatalog}>Channels catalog</button>
        </li>
      </ul>
      Channels:
      <ul>
        <li>
          <button onClick={handleMain}>Main</button>
        </li>
      </ul>
      <button onClick={handleAddChannel}>Add a Channel</button>
    </div>
  );
};
