import { Icon, IconProps } from './Icon';

export const HashtagIcon = ({ color, size, fill }: IconProps) => (
  <Icon color={color} size={size} fill={fill}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
    />
  </Icon>
);
