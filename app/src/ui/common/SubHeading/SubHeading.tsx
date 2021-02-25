export type SubHeadingProps = Readonly<{
  children: string;
}>;

export const SubHeading = ({ children }: SubHeadingProps) => {
  return <h1 className="text-lg text-gray-700">{children}</h1>;
};
