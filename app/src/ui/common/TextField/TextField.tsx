import cx from 'classnames';
import { InputChangeEvent } from '../../utils/ui-event-types';

export type TextFieldProps = Readonly<{
  id?: string;
  type?: 'text' | 'password' | 'email';
  required?: boolean;
  value?: string;
  placeholder?: string;
  full?: boolean;
  change: (e: InputChangeEvent) => void;
}>;

export const TextField = ({
  id,
  type = 'text',
  required = false,
  value,
  placeholder,
  full = false,
  change,
}: TextFieldProps) => {
  const styles = cx('rounded', 'focus:outline-none focus:ring', {
    'w-full': full,
  });

  return (
    <input
      id={id}
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      className={styles}
      onChange={change}
    />
  );
};
