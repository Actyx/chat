import { Icon, IconProps } from './Icon';

export const XIcon = ({ color, size, fill }: IconProps) => (
  <Icon color={color} size={size} fill={fill}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </Icon>
);
