import React, { useEffect, useState } from 'react';
import { Pond } from '@actyx/pond';
import { UIStateManager } from './ui/ui-state-manager/UIStateManager';
import { ScreenRooter as ScreenRouter } from './ui/custom/ScreenRouter/ScreenRouter';
import { Debug } from './ui/custom/Debug/Debug';
import { ErrorPond } from './ui/custom/ErrorPond/ErrorPond';
import { CircularProgress } from './ui/common/CircularProgress/CircularProgress';

export const App = () => {
  const [pond, setPond] = useState<Pond>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  useEffect(() => {
    const main = async () => {
      try {
        const axPond = await Pond.default();
        setPond(axPond);
      } catch (err) {
        setPondErrorMessage(err);
      }
    };
    main();
  }, []);

  return (
    <UIStateManager>
      <>
        {pond ? (
          <>
            <ScreenRouter pond={pond} />
            <Debug pond={pond} />
          </>
        ) : (
          <CircularProgress />
        )}
        {pondErrorMessage && <ErrorPond errorMessage={pondErrorMessage} />}
      </>
    </UIStateManager>
  );
};
