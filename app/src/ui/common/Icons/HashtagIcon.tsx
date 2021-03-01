import { Icon, IconBaseProps } from './Icon';

export const HashtagIcon = ({ color, size }: IconBaseProps) => (
  <Icon color="gray-light">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
    />
  </Icon>
);
