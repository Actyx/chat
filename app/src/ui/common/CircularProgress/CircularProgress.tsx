import { Typography } from '../Typography/Typography';

export type CircularProgressProps = Readonly<{ text?: string }>;

export const CircularProgress = ({
  text = 'Loading...',
}: CircularProgressProps) => {
  return (
    <div className="flex w-screen h-screen animate-pulse items-center justify-center space-x-3">
      <svg
        className="animate-spin"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="gray"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18" />
          </g>
        </g>
      </svg>
      <Typography tag="div" color="gray-medium">
        {text}
      </Typography>
    </div>
  );
};
