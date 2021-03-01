import { ReactNode } from 'react';
import cx from 'classnames';

type HTMLTag = 'span' | 'h1' | 'div';

export type TypographyColorUI =
  | 'black'
  | 'gray-dark'
  | 'gray-medium'
  | 'red-dark'
  | 'green-dark';

export type TypographyProps = Readonly<{
  size?: 'base' | 'sm' | 'lg' | 'xxl';
  tag?: HTMLTag;
  children: ReactNode;
  weight?: 'normal' | 'semibold' | 'bold';
  color?: TypographyColorUI;
  align?: 'initial' | 'left' | 'center' | 'right';
}>;

const render = (tag: HTMLTag, style: string, children: ReactNode) => {
  switch (tag) {
    case 'span':
      return <span className={style}>{children}</span>;
    case 'div':
      return <div className={style}>{children}</div>;
    case 'h1':
      return <h1 className={style}>{children}</h1>;
  }
};

export const Typography = ({
  size = 'base',
  tag: htmlTag = 'span',
  children,
  weight = 'normal',
  color = 'black',
  align = 'initial',
}: TypographyProps) => {
  const styles = cx({
    'font-sans': true,
    'text-base': size === 'base',
    'text-sm': size === 'sm',
    'text-lg': size === 'lg',
    'text-5xl': size === 'xxl',
    'font-normal': weight === 'normal',
    'font-semibold': weight === 'semibold',
    'font-bold': weight === 'bold',
    'text-black': color === 'black',
    'text-gray-900': color === 'gray-dark',
    'text-gray-700': color === 'gray-medium',
    'text-red-900': color === 'red-dark',
    'text-left': align === 'left',
    'text-center': align === 'center',
    'text-right': align === 'right',
  });

  return render(htmlTag, styles, children);
};
