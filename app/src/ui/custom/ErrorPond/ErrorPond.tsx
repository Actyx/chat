import React from 'react';
import { Alert } from '../../common/Alert/Alert';
import { Modal } from '../../common/Modal/Modal';
import { Typography } from '../../common/Typography/Typography';

type ErrorPondProps = Readonly<{
  errorMessage: string;
}>;

export const ErrorPond = ({ errorMessage }: ErrorPondProps) => {
  return (
    <Modal>
      <Alert variant="danger">
        <div className="space-x-2">
          <Typography weight="bold" color="red-dark">
            Error:
          </Typography>
          <Typography>{errorMessage}</Typography>
        </div>
      </Alert>
    </Modal>
  );
};
