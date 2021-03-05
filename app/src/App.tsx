import { useEffect, useState } from 'react';
import { Pond } from '@actyx/pond';
import { UIStateManager } from './ui/ui-state-manager/UIStateManager';
import { ScreenRooter as ScreenRouter } from './ui/custom/ScreenRouter/ScreenRouter';
import { PondError } from './ui/custom/PondError/PondError';
import { Debug } from './ui/custom/Debug/Debug';

export const App = () => {
  const [pond, setPond] = useState<Pond>();

  useEffect(() => {
    const main = async () => {
      const axPond = await Pond.default();
      setPond(axPond);
    };
    main();
  }, []);

  return (
    <UIStateManager>
      {pond ? (
        <>
          <ScreenRouter pond={pond} />
          <Debug pond={pond} />
        </>
      ) : (
        <PondError />
      )}
    </UIStateManager>
  );
};
