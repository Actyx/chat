import { Pond } from '@actyx/pond';
import { useContext, useState } from 'react';
import { mkChannelFish } from '../../../business-logic/channel-fish/channel-fish';
import { ChannelCatalogFish } from '../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateContextUI } from '../../state-manager/UIStateManager';
import { useFish } from '../../utils/use-fish';

type DebugProps = Readonly<{
  pond: Pond;
}>;

const format = (value: any) => JSON.stringify(value, undefined, 4);

export const Debug = ({ pond }: DebugProps) => {
  const stateUI = useContext(StateContextUI);

  const [showDebug, setShowDebug] = useState<boolean>(false);

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const stateChannelsCatalogFish = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const stateChannelFish = useFish(
    pond,
    mkChannelFish(stateUI.activeChannelId),
    mkChannelFish(stateUI.activeChannelId).initialState
  );

  const handleShowDebug = () => setShowDebug(!showDebug);

  return (
    <div className="fixed top-0 left-0">
      <div className="w-5 h-5 cursor-help" onClick={handleShowDebug} />
      {showDebug && (
        <div
          style={{ width: '75vw', height: '50vh' }}
          className="fixed bottom-1 left-1 bg-gray-100 p-2 overflow-scroll opacity-90"
        >
          <h5>stateUI</h5>
          <pre>{format(stateUI)}</pre>
          <br />
          <hr />
          <h5>UserCatalog</h5>
          <pre>{format(stateUserCatalogFish)}</pre>
          <h5>ChannelFish</h5>
          <pre>{format(stateChannelFish)}</pre>
          <h5>ChannelsCatalogFish state</h5>
          <pre>{format(stateChannelsCatalogFish)}</pre>
        </div>
      )}
    </div>
  );
};
