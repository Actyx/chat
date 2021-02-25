export type HeadingProps = Readonly<{
  children: string;
}>;

export const Heading1 = ({ children }: HeadingProps) => {
  return (
    <h1 className="font-sans text-5xl font-semibold text-gray-900">
      {children}
    </h1>
  );
};
