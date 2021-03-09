import React, { ReactNode } from 'react';
import { MouseEventDiv } from '../../utils/ui-event-types';
import { Modal } from '../Modal/Modal';
import './dialog.css';

export type DialogProps = Readonly<{
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
  close: () => void;
}>;

export const Dialog = ({ header, body, footer }: DialogProps) => {
  const handleClick = (e: MouseEventDiv) => {
    e.stopPropagation();
  };

  return (
    <Modal>
      <div className="w-screen h-screen flex items-center	justify-center">
        <div
          className="dialog flex flex-col rounded-lg bg-white"
          onClick={handleClick}
        >
          <div className="h-20">{header}</div>
          <div className="overflow-y-auto flex-grow">{body}</div>
          <div className="h-24">{footer}</div>
        </div>
      </div>
    </Modal>
  );
};
