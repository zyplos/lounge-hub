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
