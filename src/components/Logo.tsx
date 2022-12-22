import Image from 'next/image'
import Link from 'next/link'

import { AppConfig } from '@/utils/AppConfig'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center font-medium">
      <Image
        className="h-8 w-8 rounded-full"
        alt="logo"
        height={32}
        width={32}
        src="/assets/images/logo.webp"
      />
      <h2 className="ml-3 text-xl font-extrabold">{AppConfig.title}</h2>
    </Link>
  )
}
