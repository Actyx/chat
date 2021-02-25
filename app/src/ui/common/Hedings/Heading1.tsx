type Props = Readonly<{
  children: string;
}>;

export const Heading1 = ({ children }: Props) => {
  return <h1 className="text-5xl">{children}</h1>;
};
