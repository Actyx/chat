import { InputChangeEvent } from '../../../../common/ui-types';

export type TextFieldProps = Readonly<{
  type?: 'text' | 'password';
  required?: boolean;
  value?: string;
  placeholder?: string;
  onChange: (e: InputChangeEvent) => void;
}>;

export const TextField = ({
  type = 'text',
  required = false,
  value,
  placeholder,
  onChange,
}: TextFieldProps) => {
  return (
    <input
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      className="rounded"
      onChange={onChange}
    />
  );
};
