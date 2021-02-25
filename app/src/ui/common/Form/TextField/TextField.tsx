import { InputChangeEvent } from '../../../../common/ui-types';

export type TextFieldProps = Readonly<{
  type?: 'text' | 'password';
  value?: string;
  required?: boolean;
  placeholder?: string;
  onChange: (e: InputChangeEvent) => void;
}>;

export const TextField = ({
  type = 'text',
  value,
  required = false,
  placeholder,
  onChange,
}: TextFieldProps) => {
  return (
    <>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        className="rounded"
        onChange={onChange}
      />
    </>
  );
};
