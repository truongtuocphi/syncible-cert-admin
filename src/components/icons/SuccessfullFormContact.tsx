interface SuccessfullFormContactProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  color?: string;
}

const SuccessfullFormContact: React.FC<SuccessfullFormContactProps> = ({
  width = '200',
  height = '200',
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M186.207 66.4824L194.793 73.2755C198.078 75.8958 199.993 79.8669 200 84.0686V186.207C200 193.824 193.825 200 186.207 200H13.7931C6.17538 200 0 193.824 0 186.207V84.0686C0.00656234 79.8669 1.92231 75.8958 5.2069 73.2755L13.7931 66.4824H186.207Z"
        fill="url(#paint0_linear_1446_18864)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.793 164.621V6.89655C13.8043 3.09241 16.8854 0.0113614 20.6895 0H179.31C183.114 0.0113614 186.195 3.09241 186.207 6.89655V161.034L13.793 164.621Z"
        fill="#E2F5FA"
      />
      <path
        d="M100 110.345C126.662 110.345 148.276 88.7309 148.276 62.0688C148.276 35.4068 126.662 13.793 100 13.793C73.3384 13.793 51.7246 35.4068 51.7246 62.0688C51.7246 88.7309 73.3384 110.345 100 110.345Z"
        fill="url(#paint1_linear_1446_18864)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M89.6557 89.6547C87.826 89.6581 86.0707 88.9307 84.7798 87.634L70.9867 73.8409C68.3731 71.1349 68.4105 66.8335 71.0707 64.1732C73.731 61.513 78.0324 61.4756 80.7384 64.0892L89.6557 73.003L119.263 43.3996C120.994 41.6067 123.558 40.8877 125.97 41.5189C128.381 42.15 130.264 44.0331 130.895 46.4443C131.526 48.8556 130.807 51.4197 129.014 53.1513L94.5316 87.634C93.2407 88.9307 91.4854 89.6581 89.6557 89.6547Z"
        fill="#ECF0F1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M200.001 85.8965L200.001 186.207C200.017 190.122 198.346 193.854 195.414 196.448L130.38 145.896L200.001 85.8965Z"
        fill="url(#paint2_linear_1446_18864)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M195.414 196.448C192.891 198.732 189.611 199.997 186.208 200H13.7938C10.3909 199.997 7.11007 198.732 4.58691 196.448L69.6214 145.897L95.7248 125.621C98.2366 123.655 101.765 123.655 104.277 125.621L130.38 145.897L195.414 196.448Z"
        fill="url(#paint3_linear_1446_18864)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M69.6208 145.896L4.58633 196.448C1.65484 193.854 -0.0163975 190.122 0.00012131 186.207L0 85.8965L69.6208 145.896Z"
        fill="url(#paint4_linear_1446_18864)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1446_18864"
          x1="99.9877"
          y1="351.528"
          x2="99.9877"
          y2="-34.1131"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A6CC9" />
          <stop offset="1" stop-color="#D1D3D4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1446_18864"
          x1="63.9178"
          y1="101.446"
          x2="104.038"
          y2="13.6605"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A6CC9" />
          <stop offset="1" stop-color="#95F4F0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1446_18864"
          x1="139.172"
          y1="186.259"
          x2="196.933"
          y2="106.668"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A6CC9" />
          <stop offset="1" stop-color="#95F4F0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1446_18864"
          x1="28.6859"
          y1="193.009"
          x2="43.3481"
          y2="112.301"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A6CC9" />
          <stop offset="1" stop-color="#95F4F0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1446_18864"
          x1="8.7922"
          y1="186.259"
          x2="66.5532"
          y2="106.668"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A6CC9" />
          <stop offset="1" stop-color="#95F4F0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SuccessfullFormContact;
