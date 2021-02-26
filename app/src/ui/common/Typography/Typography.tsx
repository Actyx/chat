import { ReactNode } from 'react';
import cx from 'classnames';

export type HTMLTag = 'span';

export type TypographyProps = Readonly<{
  size: 'base' | 'sm';
  htmlTag?: HTMLTag;
  children: ReactNode;
  weight?: 'normal' | 'semibold' | 'bold';
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
}: TypographyProps) => {
  const styles = cx('font-sansserif', {
    'text-base': size === 'base',
    'text-sm': size === 'sm',
    'font-normal': weight === 'normal',
    'font-semibold': weight === 'semibold',
    'font-bold': weight === 'bold',
  });

  return render(htmlTag, styles, children);
};
