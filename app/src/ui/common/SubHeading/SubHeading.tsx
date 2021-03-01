import { Typography } from '../../common/Typography/Typography';

export type SubHeadingProps = Readonly<{
  children: string;
}>;

export const SubHeading = ({ children }: SubHeadingProps) => {
  return (
    <Typography tag="div" size="lg" color="gray-medium">
      {children}
    </Typography>
  );
};
