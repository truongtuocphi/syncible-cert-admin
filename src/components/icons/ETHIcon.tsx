interface ETHIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
}

const IconETH: React.FC<ETHIconProps> = ({ width = '1em', height = '1em' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#EDF0F4" />
      <path
        d="M11.9666 4.7998L11.8711 5.12406V14.5324L11.9666 14.6276L16.3337 12.0462L11.9666 4.7998Z"
        fill="#343434"
      />
      <path d="M11.9669 4.7998L7.59961 12.0462L11.9669 14.6276V10.0611V4.7998Z" fill="#8C8C8C" />
      <path
        d="M11.9659 15.4546L11.9121 15.5202V18.8716L11.9659 19.0287L16.3357 12.8745L11.9659 15.4546Z"
        fill="#3C3C3B"
      />
      <path d="M11.9669 19.0287V15.4546L7.59961 12.8745L11.9669 19.0287Z" fill="#8C8C8C" />
      <path d="M11.9668 14.6276L16.334 12.0461L11.9668 10.061V14.6276Z" fill="#141414" />
      <path d="M7.59961 12.0461L11.9669 14.6276V10.061L7.59961 12.0461Z" fill="#393939" />
    </svg>
  );
};

export default IconETH;
