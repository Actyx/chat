import React from 'react';
import { Alert } from '../../common/Alert/Alert';
import { Modal } from '../../common/Modal/Modal';
import { Typography } from '../../common/Typography/Typography';

type AlertMessageProps = Readonly<{
  variant: 'warning' | 'danger';
  message: string;
}>;

export const PondErrorMessage = ({ variant, message }: AlertMessageProps) => {
  return (
    <Modal>
      <Alert variant={variant}>
        <div className="space-x-2">
          <Typography weight="bold" color="red-dark">
            {variant === 'warning' ? 'Warning:' : 'Error:'}
          </Typography>
          <Typography>{message}</Typography>
        </div>
      </Alert>
    </Modal>
  );
};
