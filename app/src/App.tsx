import React, { useState } from 'react';
import { UIStateManager } from './ui/state-manager/UIStateManager';
import { Pond } from '@actyx-contrib/react-pond';
import { Alert } from './ui/common/Alert/Alert';
import { Debug } from './ui/custom/Debug/Debug';
import { ScreenRouter } from './ui/custom/ScreenRouter/ScreenRouter';

export const App = () => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  return (
    <>
      <Pond onError={(err) => setPondErrorMessage(err as string)}>
        <UIStateManager>
          <>
            <ScreenRouter />
            <Debug />
          </>
        </UIStateManager>
      </Pond>
      {pondErrorMessage && (
        <div className="fixed top-0 left-0 w-full">
          <Alert variant="danger">{pondErrorMessage}</Alert>
        </div>
      )}
    </>
  );
};
