import React, { ReactNode } from 'react';
import { XIcon } from '../Icons/XIcon';
import { Typography } from '../Typography/Typography';
import { ButtonLink } from '../../common/ButtonLink/ButtonLink';
import { Header } from './Header';

export type FlexPanelProps = Readonly<{
  title: string;
  close: () => void;
  children: ReactNode;
}>;

export const FlexPanel = ({ title, close, children }: FlexPanelProps) => {
  return (
    <div className="h-full border-solid border-l border-gray-300">
      <Header>
        <Typography tag="div" weight="bold" color="gray-dark">
          {title}
        </Typography>
        <ButtonLink type="button" click={close}>
          <XIcon size="base" color="gray-dark" />
        </ButtonLink>
      </Header>
      <div className="p-4">{children}</div>
    </div>
  );
};
