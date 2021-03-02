import { ReactNode } from 'react';
import { XIcon } from '../Icons/XIcon';
import { Typography } from '../Typography/Typography';

type FlexPanelProps = Readonly<{
  title: string;
  close: () => void;
  children: ReactNode;
}>;

export const FlexPanel = ({ title, close, children }: FlexPanelProps) => {
  return (
    <div className="w-96 border-solid border-l border-gray-300">
      <div className="flex items-center justify-between p-4 border-b">
        <Typography tag="div" weight="bold">
          {title}
        </Typography>
        <XIcon size="medium" color="gray-dark" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};
