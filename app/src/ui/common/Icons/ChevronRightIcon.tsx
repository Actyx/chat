import { Icon, IconBaseProps } from './Icon';

export const ChevronRightIcon = ({ color, size }: IconBaseProps) => (
  <Icon color={color} size={size}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </Icon>
);
