import React, { ReactNode } from 'react';
import { Button } from '../Button/Button';

type FooterProps = Readonly<{
  textConfirm: ReactNode;
  confirm: () => void;
}>;

export const Footer = ({ textConfirm, confirm }: FooterProps) => {
  return (
    <div className="flex flex-end items-center justify-end h-full pt-5 pb-5 pl-7 pr-7 space-x-3">
      <Button color="green">{textConfirm}</Button>
    </div>
  );
};
