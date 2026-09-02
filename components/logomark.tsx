// Bien logomark (the "B" monogram) — the large hero figure. Uses
// fill="currentColor" so it follows the current text color. Size via
// `className` (default h-full w-auto so it fills its container height).
export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 522 733"
      fill="currentColor"
      role="img"
      aria-label="Bien"
      className={className ?? "h-full w-auto"}
    >
      <path d="M306.4 670.8V361.1c84.8.7 153.6 69.9 153.6 154.8 0 85-68.8 154.1-153.6 154.9zm-.3-372c-22.2 0-42.9-6.3-60.7-17-34.2-20.7-57.3-58.1-57.3-100.9s23-80.3 57.3-100.9c17.7-10.7 38.5-17 60.7-17 .5 0 .9.1 1.3.1 64.4.7 116.6 53.3 116.6 117.8 0 64.6-52.2 117.1-116.6 117.8-.4.1-.9.1-1.3.1zm-60.7 74.6v297.4H63V63h107.4c-27.5 31.6-44.2 72.8-44.2 117.9 0 59.9 29.4 112.8 74.4 145.5 13.6 9.9 28.7 17.9 44.8 23.7v23.3zm166.1-47c45-32.7 74.4-85.6 74.4-145.5C486 82 406.1 1.8 307.4 1.1V1H1v731.8H307.4v-.1C426.6 732 523 635.3 523 515.9c0-81.5-45-152.4-111.5-189.5z" />
    </svg>
  )
}
