import cx from 'classnames';
import { InputChangeEvent } from '../../../../common/ui-types';

export type TextFieldProps = Readonly<{
  type?: 'text' | 'password' | 'email';
  required?: boolean;
  value?: string;
  placeholder?: string;
  full?: boolean;
  onChange: (e: InputChangeEvent) => void;
}>;

export const TextField = ({
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
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      className={styles}
      onChange={onChange}
    />
  );
};
