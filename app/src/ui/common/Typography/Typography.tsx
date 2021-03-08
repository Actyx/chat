import { ReactNode } from 'react';
import cx from 'classnames';
import { ColorUI, mkColor } from '../../utils/ui-colors';

type HTMLTag = 'span' | 'h1' | 'div';

export type TypographyProps = Readonly<{
  size?: 'base' | 'sm' | 'lg' | 'xxl' | 'xxl2';
  tag?: HTMLTag;
  children: ReactNode;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: ColorUI;
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
  const styles = cx(
    {
      'font-sans': true,
      'text-base': size === 'base',
      'text-sm': size === 'sm',
      'text-lg': size === 'lg',
      'text-2xl': size === 'xxl2',
      'text-5xl': size === 'xxl',
      'font-normal': weight === 'normal',
      'font-medium': weight === 'medium',
      'font-semibold': weight === 'semibold',
      'font-bold': weight === 'bold',
      'text-left': align === 'left',
      'text-center': align === 'center',
      'text-right': align === 'right',
    },
    mkColor('text')(color)
  );

  return render(htmlTag, styles, children);
};
