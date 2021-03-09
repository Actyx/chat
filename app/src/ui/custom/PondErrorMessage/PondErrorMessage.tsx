import React from 'react';
import { Alert } from '../../common/Alert/Alert';
import { Typography } from '../../common/Typography/Typography';

export type PondErrorMessageProps = Readonly<{
  variant: 'warning' | 'danger';
  message: string;
}>;

export const PondErrorMessage = ({
  variant,
  message,
}: PondErrorMessageProps) => {
  return (
    <div className="fixed top-0 left-0 w-full p-4">
      <Alert variant={variant}>
        <div className="space-x-2">
          <Typography weight="bold" color="red-dark">
            {variant === 'warning' ? 'Warning:' : 'Error:'}
          </Typography>
          <Typography>{message}</Typography>
        </div>
      </Alert>
    </div>
  );
};
