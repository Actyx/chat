import React, { FC, useEffect, useState } from 'react';
import { Pond } from '@actyx/pond';
import { UIStateManager } from './ui/ui-state-manager/UIStateManager';
import { ScreenRooter as ScreenRouter } from './ui/ScreenRouter/ScreenRouter';
import { PondError } from './ui/PondError/PondError';
import { Debug } from './ui/Debug/Debug';

export const App: FC = () => {
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
        <div>
          <ScreenRouter pond={pond} />
          <Debug pond={pond} />
        </div>
      ) : (
        <PondError />
      )}
    </UIStateManager>
  );
};
