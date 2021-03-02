import cx from 'classnames';
import { InputChangeEvent } from '../../../utils/ui-event-types';

export type TextFieldProps = Readonly<{
  id?: string;
  type?: 'text' | 'password' | 'email';
  required?: boolean;
  value?: string;
  placeholder?: string;
  full?: boolean;
  onChange: (e: InputChangeEvent) => void;
}>;

export const TextField = ({
  id,
  type = 'text',
  required = false,
  value,
  placeholder,
  full = false,
  onChange,
}: TextFieldProps) => {
  const styles = cx('rounded', { 'w-full': full });

  return (
    <input
      id={id}
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      className={styles}
      onChange={onChange}
    />
  );
};
