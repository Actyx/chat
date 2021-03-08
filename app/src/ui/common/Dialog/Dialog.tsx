import React, { ReactNode } from 'react';
import { Modal } from '../Modal/Modal';
import './dialog.css';

export type DialogProps = Readonly<{
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}>;

export const Dialog = ({ header, body, footer }: DialogProps) => {
  return (
    <Modal>
      <div className="w-screen h-screen flex items-center	justify-center">
        <div className="dialog flex flex-col rounded-lg bg-white">
          <div className="h-20">{header}</div>
          <div className="overflow-y-auto flex-grow">{body}</div>
          <div className="h-24">{footer}</div>
        </div>
      </div>
    </Modal>
  );
};
