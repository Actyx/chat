import { Icon, IconBaseProps } from './Icon';

export const ChevronDownIcon = ({ color, size }: IconBaseProps) => (
  <Icon color={color} size={size}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </Icon>
);
