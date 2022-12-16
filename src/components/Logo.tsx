import Link from 'next/link'

import { AppConfig } from '@/utils/AppConfig'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-10 w-10 rounded-full bg-red-500 p-2"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <h2 className="ml-3 text-xl font-extrabold">{AppConfig.title}</h2>
    </Link>
  )
}
