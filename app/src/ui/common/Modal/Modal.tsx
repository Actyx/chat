export type ModalProps = Readonly<{
  close?: () => void;
}>;

export const Modal = ({ close }: ModalProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60"
      onClick={close}
    />
  );
};
