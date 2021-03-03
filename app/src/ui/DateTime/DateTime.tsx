import { Milliseconds } from '@actyx/pond';

type DateTimeProps = Readonly<{
  timestamp: Milliseconds;
}>;

export const DateTime = ({ timestamp }: DateTimeProps) => {
  return <>{new Date(timestamp).toLocaleString()}</>;
};
