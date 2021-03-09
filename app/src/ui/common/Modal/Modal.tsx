import { ReactNode } from 'react';

export type ModalProps = Readonly<{
  children: ReactNode;
}>;

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60">
      {children}
    </div>
  );
};
