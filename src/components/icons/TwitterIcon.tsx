interface TwitterIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  color?: string;
}

const TwitterIcon: React.FC<TwitterIconProps> = ({
  width = "1em",
  height = "1em",
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 -2 20 20"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="#fff" transform="translate(-60 -7521)">
          <g transform="translate(56 160)">
            <path d="M10.29 7377c7.547 0 11.675-6.156 11.675-11.495 0-.175 0-.349-.012-.522A8.265 8.265 0 0024 7362.89a8.273 8.273 0 01-2.356.637 4.07 4.07 0 001.804-2.235 8.303 8.303 0 01-2.606.98 4.153 4.153 0 00-5.806-.175 4.006 4.006 0 00-1.187 3.86 11.717 11.717 0 01-8.457-4.22 4.005 4.005 0 001.271 5.392 4.122 4.122 0 01-1.863-.505v.051c.001 1.923 1.378 3.579 3.292 3.96a4.144 4.144 0 01-1.852.069c.537 1.646 2.078 2.773 3.833 2.806A8.315 8.315 0 014 7375.185a11.754 11.754 0 006.29 1.812"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default TwitterIcon;
