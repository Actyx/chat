import { ReactNode } from 'react';

export type ModalProps = Readonly<{
  children: ReactNode;
}>;

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="w-screen h-screen bg-black bg-opacity-60">{children}</div>
  );
};
