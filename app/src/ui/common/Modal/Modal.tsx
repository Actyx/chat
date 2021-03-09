import { ReactNode } from 'react';

export type ModalProps = Readonly<{
  children: ReactNode;
  close?: () => void;
}>;

export const Modal = ({ children, close }: ModalProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60"
      onClick={close}
    >
      {children}
    </div>
  );
};
