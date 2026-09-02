// Bien wordmark. Uses fill="currentColor" so it follows the current text color
// (light/dark). Size it with a height utility via `className` (default h-5).
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 21"
      fill="currentColor"
      role="img"
      aria-label="Bien"
      className={className ?? "h-5 w-auto"}
    >
      <path d="M13.8 9.6c1.3-.9 2-2.3 2-4 0-3.5-2.1-5.6-6.2-5.6H0v20.6h10.1c4 0 6.5-2.4 6.5-6.1 0-2.3-1.1-3.9-2.8-4.9zm-9.9-6h5.6c1.5 0 2.4.9 2.4 2.3s-1.1 2.3-2.4 2.3H3.9V3.6zM9.6 17H3.9v-5.3h5.5c2 0 3.1 1 3.1 2.7.1 2-1.4 2.6-2.9 2.6zM32.6 4.9c-4.3 0-7.9 3.6-7.9 8.1s3.6 8 7.9 8c3.8 0 6.5-2.1 7.4-5.2h-4.2c-.7 1.2-1.9 1.8-3.3 1.8-1.9 0-3.3-1.2-3.9-3h11.6c.7-6.2-3.1-9.7-7.6-9.7zm-3.8 6.4c.6-1.8 2-2.9 3.8-2.9 1.9 0 3.4 1.1 3.9 2.9h-7.7zM18.7 5.3h3.9v15.3h-3.9zM49.2 4.9c-4.2 0-6.9 2.9-6.9 6.8v8.9h3.9v-9c0-1.7 1.3-2.9 3-2.9 2.6 0 2.9 2.1 2.9 2.9v9H56v-8.9c0-3.9-2.5-6.8-6.8-6.8zM18.7 0h3.9v3.7h-3.9z" />
    </svg>
  )
}
