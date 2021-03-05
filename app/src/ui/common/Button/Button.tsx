import cx from 'classnames';

type BaseProps = Readonly<{
  color?: 'purple' | 'green' | 'white';
  size?: 'base' | 'sm';
  full?: boolean;
  children: string;
  click?: () => void;
}>;

type VariantSubmit = BaseProps &
  Readonly<{
    type?: 'submit';
  }>;

type VariantButton = BaseProps &
  Readonly<{
    type: 'button';
    click: () => void;
  }>;

export type ButtonProps = VariantSubmit | VariantButton;

export const Button = ({
  type = 'submit',
  color = 'purple',
  size = 'base',
  full = false,
  children,
  click,
}: ButtonProps) => {
  const isWhite = color === 'white';
  const isGreen = color === 'green';
  const isPurple = color === 'purple';
  const isBig = size === 'base';
  const isSmall = size === 'sm';

  const styles = cx(
    'focus:outline-none focus:ring',
    'rounded',
    'font-sans',
    'leading-4',
    { 'w-full': full },
    { 'bg-purple-900 hover:bg-purple-800': isPurple },
    { 'bg-green-700 hover:bg-green-600': isGreen },
    { 'bg-white hover:bg-gray-50': isWhite },
    { 'border border-gray-400': isWhite },
    { 'font-semibold': !isWhite },
    { 'font-normal': isWhite },
    { 'text-base': isSmall },
    { 'text-xl': isBig },
    { 'text-white': !isWhite },
    { 'text-gray-700': isWhite },
    { 'h-11': isBig },
    { 'h-9': isSmall },
    { 'pt-2 pb-2 pl-4 pr-4': isBig },
    { 'pl-3 pr-3': isSmall }
  );
  return (
    <button type={type} className={styles} onClick={click}>
      {children}
    </button>
  );
};
