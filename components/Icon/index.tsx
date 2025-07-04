export function CommunityIcon({ ...props }: React.SVGAttributes<SVGElement>) {
  return (
    /** biome-ignore lint/a11y/noSvgWithoutTitle: decorative */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      {...props}
    >
      <path d="M32,12A20,20,0,1,1,12,32,20,20,0,0,1,32,12M32,0A32,32,0,1,0,64,32,32,32,0,0,0,32,0Z" />
    </svg>
  );
}

export function CalendarIcon({ ...props }: React.SVGAttributes<SVGElement>) {
  return (
    /** biome-ignore lint/a11y/noSvgWithoutTitle: decorative */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      {...props}
    >
      <path d="M54,9V19H39V9H25V19H10V9H0V64H64V9Zm3,48H7V28H57Z" />
      <polygon points="13 0 13 9 13 16 22 16 22 9 22 0 13 0" />
      <polygon points="42 0 42 9 42 16 51 16 51 9 51 0 42 0" />
    </svg>
  );
}

export function PlayerIcon({ ...props }: React.SVGAttributes<SVGElement>) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="currentColor"
      {...props}
    >
      <path d="M7,21.17,29,33.74V58.83L7,46.26V21.17M4,16V48L32,64V32L4,16Z" />
      <path d="M57,21.17V46.26L35,58.83V33.74L57,21.17M60,16,32,32V64L60,48V16Z" />
      <polygon points="32 0 4 16 4 25 32 41 60 25 60 16 32 0" />
      <polygon points="33 63 32 64 31 63 29.5 38 34.5 38 33 63" />
      <polygon points="34.1 45.63 41 42 41 49.67 47 47 47 53 58 47 58 24 34 34 34.1 45.63" />
      <polygon points="10.18 36.8 13.91 38.93 13.91 46.13 10.18 44 10.18 36.8" />
      <polygon points="5.91 22.81 9.63 24.94 9.63 33.41 5.91 31.28 5.91 22.81" />
      <polygon points="26.31 32.7 30.04 34.83 30.04 43.3 26.31 41.17 26.31 32.7" />
      <polygon points="20.63 42.73 24.35 44.86 24.35 52.06 20.63 49.93 20.63 42.73" />
    </svg>
  );
}
