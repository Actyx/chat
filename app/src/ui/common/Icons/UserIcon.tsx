import { Icon, IconProps } from './Icon';

export const UserIcon = ({ color, size, fill }: IconProps) => (
  <Icon color={color} size={size} fill={fill}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </Icon>
);
