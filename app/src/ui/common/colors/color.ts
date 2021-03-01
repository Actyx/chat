import cx from 'classnames';

export type ColorUI =
  | 'white'
  | 'black'
  | 'gray-light'
  | 'gray-medium'
  | 'gray-dark'
  | 'red-light'
  | 'red-medium'
  | 'red-dark'
  | 'green-light'
  | 'green-medium'
  | 'green-dark';

export const mkColor = (type: 'text' | 'bg') => (color: ColorUI): string => {
  const styled = {
    text: {
      'text-white': color === 'white',
      'text-black': color === 'black',

      'text-gray-300': color === 'gray-light',
      'text-gray-700': color === 'gray-medium',
      'text-gray-900': color === 'gray-dark',

      'text-red-100': color === 'red-light',
      'text-red-700': color === 'red-medium',
      'text-red-900': color === 'red-dark',

      'text-green-100': color === 'green-light',
      'text-green-700': color === 'green-medium',
      'text-green-900': color === 'green-dark',
    },
    bg: {
      'bg-white': color === 'white',
      'bg-black': color === 'black',

      'bg-gray-300': color === 'gray-light',
      'bg-gray-700': color === 'gray-medium',
      'bg-gray-900': color === 'gray-dark',

      'bg-red-100': color === 'red-light',
      'bg-red-700': color === 'red-medium',
      'bg-red-900': color === 'red-dark',

      'bg-green-100': color === 'green-light',
      'bg-green-700': color === 'green-medium',
      'bg-green-900': color === 'green-dark',
    },
  };
  return cx(styled[type]);
};
