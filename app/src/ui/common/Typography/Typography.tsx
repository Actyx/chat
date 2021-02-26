import { ReactNode } from 'react';
import cx from 'classnames';

type HTMLTag = 'span' | 'h1';

export type TypographyColorUI = 'black' | 'gray-dark' | 'red-dark';

export type TypographyProps = Readonly<{
  size?: 'base' | 'sm' | 'xxl';
  htmlTag?: HTMLTag;
  children: ReactNode;
  weight?: 'normal' | 'semibold' | 'bold';
  color?: TypographyColorUI;
  align?: 'initial' | 'left' | 'center' | 'right';
}>;

const render = (htmlTag: HTMLTag, style: string, children: ReactNode) => {
  switch (htmlTag) {
    case 'span':
      return <span className={style}>{children}</span>;
    case 'h1':
      return <h1 className={style}>{children}</h1>;
  }
};

export const Typography = ({
  size = 'base',
  htmlTag = 'span',
  children,
  weight = 'normal',
  color = 'black',
  align = 'initial',
}: TypographyProps) => {
  const styles = cx({
    'font-sans': true,
    'text-base': size === 'base',
    'text-sm': size === 'sm',
    'text-5xl': size === 'xxl',
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
