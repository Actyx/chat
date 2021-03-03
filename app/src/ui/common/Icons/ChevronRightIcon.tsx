import { Icon, IconProps } from './Icon';

export const ChevronRightIcon = ({ color, size, fill }: IconProps) => (
  <Icon color={color} size={size} fill={fill}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </Icon>
);
