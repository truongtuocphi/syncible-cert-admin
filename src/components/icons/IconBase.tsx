interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
}

const IconBase: React.FC<BaseIconProps> = ({ width = '1em', height = '1em' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
    >
      <g clip-path="url(#clip0_11060_16750)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.9705 30C23.2711 30 30 23.2843 30 15C30 6.71573 23.2711 0 14.9705 0C7.21388 0 0.829681 5.8643 0.0261688 13.3928H19.8014V16.3393H0C0.67881 23.9961 7.12212 30 14.9705 30Z"
          fill="#0052FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_11060_16750">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconBase;
