import { ReactNode } from 'react';
import cx from 'classnames';

export type HTMLTag = 'span';

export type Color = 'black' | 'gray-dark' | 'red-dark';

export type TypographyProps = Readonly<{
  size?: 'base' | 'sm';
  htmlTag?: HTMLTag;
  children: ReactNode;
  weight?: 'normal' | 'semibold' | 'bold';
  color?: Color;
  align?: 'left' | 'center' | 'right';
}>;

const render = (htmlTag: HTMLTag, style: string, children: ReactNode) => {
  switch (htmlTag) {
    case 'span':
      return <span className={style}>{children}</span>;
  }
};

export const Typography = ({
  size = 'base',
  htmlTag = 'span',
  children,
  weight = 'normal',
  color = 'black',
  align = 'left',
}: TypographyProps) => {
  const styles = cx({
    'font-sans': true,
    'text-base': size === 'base',
    'text-sm': size === 'sm',
    'font-normal': weight === 'normal',
    'font-semibold': weight === 'semibold',
    'font-bold': weight === 'bold',
    'text-black': color === 'black',
    'text-gray-900': color === 'gray-dark',
    'text-red-900': color === 'red-dark',
    'text-left': align === 'left',
    'text-center': align === 'center',
    'text-right': align === 'right',
  });

  return render(htmlTag, styles, children);
};
