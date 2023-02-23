import { ComponentProps } from "react";

export function BlueGradient({ classNames }: { classNames: ComponentProps<"svg">["className"] }) {
  return (
    <svg
      strokeMiterlimit="10"
      style={{
        fillRule: "nonzero",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      className={classNames}
      version="1.1"
      viewBox="0 0 1920 1080"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <radialGradient
          cx="276.406"
          cy="533.589"
          gradientTransform="matrix(-6.32804 -4.26263 9.0969 -13.5047 -2321.61 9767.39)"
          gradientUnits="userSpaceOnUse"
          id="RadialGradientBlue"
          r="161.763"
        >
          <stop offset="0" stopColor="#0285cc" />
          <stop offset="1" stopColor="#000002" stopOpacity="0" />
        </radialGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="861.513"
          id="FilterBlue"
          width="852.363"
          x="8.26951"
          y="15.3481"
        >
          <feGaussianBlur in="SourceGraphic" result="Blur" stdDeviation="12.5968" />
        </filter>
      </defs>
      <g id="Layer-1">
        <path
          d="M758.592 664.45C634.255 849.033 388.337 900.91 209.319 780.322C30.3008 659.733-14.0272 412.343 110.31 227.76C234.647 43.177 480.565-8.70087 659.583 111.888C838.601 232.476 882.929 479.866 758.592 664.45Z"
          fill="url(#RadialGradientBlue)"
          fillRule="nonzero"
          filter="url(#FilterBlue)"
          opacity="1"
          stroke="#007aff"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export function PurpleGradient({ classNames }: { classNames: ComponentProps<"svg">["className"] }) {
  return (
    <svg
      height="100%"
      strokeMiterlimit="10"
      style={{
        fillRule: "nonzero",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      className={classNames}
      version="1.1"
      viewBox="0 0 1920 1080"
      width="100%"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <radialGradient
          cx="910.6"
          cy="475.459"
          gradientTransform="matrix(-0.969124 0.0162825 -0.0204714 -1.21844 2111.03 1396.04)"
          gradientUnits="userSpaceOnUse"
          id="RadialGradientPurple"
          r="859.004"
        >
          <stop offset="0" stopColor="#f855e9" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="1198.49"
          id="FilterPurple"
          width="1190.83"
          x="324.834"
          y="-65.0032"
        >
          <feGaussianBlur in="SourceGraphic" result="Blur" stdDeviation="36.7248" />
        </filter>
      </defs>
      <clipPath id="ArtboardFrame">
        <rect height="1080" width="1920" x="0" y="0" />
      </clipPath>
      <g clipPath="url(#ArtboardFrame)" id="Layer-2">
        <path
          d="M1423.78 525.781C1428.49 805.988 1206.87 1036.93 928.773 1041.6C650.682 1046.27 421.427 822.908 416.719 542.7C412.012 262.493 633.633 31.5531 911.725 26.8808C1189.82 22.2085 1419.07 245.574 1423.78 525.781Z"
          fill="url(#RadialGradientPurple)"
          fillRule="nonzero"
          filter="url(#FilterPurple)"
          opacity="1"
          stroke="#007aff"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export function PurpleBlueGradientCombined({
  classNames,
}: {
  classNames: ComponentProps<"svg">["className"];
}) {
  return (
    <svg
      height="100%"
      strokeMiterlimit="10"
      style={{
        fillRule: "nonzero",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      className={classNames}
      version="1.1"
      viewBox="0 0 1920 1080"
      width="100%"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <radialGradient
          cx="341.687"
          cy="560.558"
          gradientTransform="matrix(-10.6711 0.73628 -1.09638 -15.8901 5353.95 9307.27)"
          gradientUnits="userSpaceOnUse"
          id="RadialGradient"
          r="92.8967"
        >
          <stop offset="0" stopColor="#0078b9" />
          <stop offset="0.51875" stopColor="#245d7d" stopOpacity="0.589583" />
          <stop offset="1" stopColor="#000002" stopOpacity="0" />
        </radialGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="936.001"
          id="Filter"
          width="1240.42"
          x="23.091"
          y="74.1422"
        >
          <feGaussianBlur in="SourceGraphic" result="Blur" stdDeviation="29.1666" />
        </filter>
        <radialGradient
          cx="831.453"
          cy="641.653"
          gradientTransform="matrix(0.893898 -0.0158968 0.0163295 0.91823 284.026 -109.372)"
          gradientUnits="userSpaceOnUse"
          id="RadialGradient_2"
          r="905.265"
        >
          <stop offset="0" stopColor="#d438c5" />
          <stop offset="0.527083" stopColor="#9b2c90" stopOpacity="0.5" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="910.717"
          id="Filter_2"
          width="1074.82"
          x="843.117"
          y="80.3308"
        >
          <feGaussianBlur in="SourceGraphic" result="Blur" stdDeviation="29.1666" />
        </filter>
      </defs>
      <g id="Layer-2">
        <g opacity="1">
          <path
            d="M1189.9 504.428C1204.89 721.615 972.314 914.566 670.432 935.395C368.55 956.224 111.678 797.044 96.6929 579.857C81.7075 362.67 314.283 169.72 616.165 148.891C918.048 128.062 1174.92 287.241 1189.9 504.428Z"
            fill="url(#RadialGradient)"
            fillRule="nonzero"
            filter="url(#Filter)"
            opacity="1"
            stroke="#007aff"
            strokeLinecap="butt"
            strokeLinejoin="round"
            strokeWidth="0"
          />
          <path
            d="M916.084 543.949C912.329 332.782 1117.22 157.9 1373.73 153.338C1630.24 148.777 1841.22 316.263 1844.97 527.43C1848.73 738.597 1643.83 913.479 1387.33 918.04C1130.82 922.602 919.839 755.116 916.084 543.949Z"
            fill="url(#RadialGradient_2)"
            fillRule="nonzero"
            filter="url(#Filter_2)"
            opacity="1"
            stroke="#007aff"
            strokeLinecap="butt"
            strokeLinejoin="round"
            strokeWidth="0"
          />
        </g>
      </g>
    </svg>
  );
}
