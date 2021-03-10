import cn from 'classnames';
import { InputChangeEvent, InputClickEvent } from '../../utils/element-events';

export type TextFieldProps = Readonly<{
  id?: string;
  type?: 'text' | 'password' | 'email';
  required?: boolean;
  value?: string;
  placeholder?: string;
  full?: boolean;
  change: (e: InputChangeEvent) => void;
  click?: (e: InputClickEvent) => void;
}>;

export const TextField = ({
  id,
  type = 'text',
  required = false,
  value,
  placeholder,
  full = false,
  change,
  click,
}: TextFieldProps) => {
  const styles = cn('rounded', 'focus:outline-none', {
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
      onClick={click}
    />
  );
};
