interface EmailIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  color?: string;
}

const EmailIcon: React.FC<EmailIconProps> = ({
  width = '1em',
  height = '1em',
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 -2 20 20"
      fill="#fff"
    >
      <path d="M22 5v4l-10 4L2 9V5a1 1 0 011-1h18a1 1 0 011 1zM2 11.154V19a1 1 0 001 1h18a1 1 0 001-1v-7.846l-10 4z"></path>
    </svg>
  );
};

export default EmailIcon;
