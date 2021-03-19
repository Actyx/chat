import { useContext, useState } from 'react';
import { mkChannelFish } from '../../../business-logic/channel-fish/channel-fish';
import { ChannelCatalogFish } from '../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateContextUI } from '../../state-manager/UIStateManager';
import { useFish } from '../../utils/use-fish';
import { usePond } from '@actyx-contrib/react-pond';
import { Pond } from '@actyx/pond';
import {
  StateUIAnonymous,
  StateUIAuthenticated,
} from '../../state-manager/state-types';

const format = (value: any) => JSON.stringify(value, undefined, 4);

const DebugAnonymous = ({
  pond,
  stateUI,
}: Readonly<{ pond: Pond; stateUI: StateUIAnonymous }>) => {
  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );
  return (
    <>
      <h5>UserCatalog</h5>
      <pre>{format(userCatalogFishState)}</pre>
    </>
  );
};

const DebugAuthenticated = ({
  pond,
  stateUI,
}: Readonly<{ pond: Pond; stateUI: StateUIAuthenticated }>) => {
  const channelCatalogFishState = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const channelFishState = useFish(
    pond,
    mkChannelFish(stateUI.activeChannelId),
    mkChannelFish(stateUI.activeChannelId).initialState
  );
  return (
    <>
      <h5>ChannelFish</h5>
      <pre>{format(channelFishState)}</pre>
      <h5>ChannelsCatalogFish state</h5>
      <pre>{format(channelCatalogFishState)}</pre>
    </>
  );
};

export const Debug = () => {
  const stateUI = useContext(StateContextUI);
  const pond = usePond();

  const [showDebug, setShowDebug] = useState<boolean>(false);

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
          {stateUI.type === 'anonymous' && (
            <DebugAnonymous pond={pond} stateUI={stateUI} />
          )}
          {stateUI.type === 'autheticated' && (
            <DebugAuthenticated pond={pond} stateUI={stateUI} />
          )}
        </div>
      )}
    </div>
  );
};
