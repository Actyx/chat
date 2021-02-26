import { Typography } from '../Typography/Typography';

export type HeadingProps = Readonly<{
  children: string;
}>;

export const Heading1 = ({ children }: HeadingProps) => {
  return (
    <Typography tag="h1" size="xxl" weight="semibold" color="gray-dark">
      {children}
    </Typography>
  );
};
