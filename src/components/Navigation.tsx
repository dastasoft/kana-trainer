import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex flex-wrap items-center justify-between text-base font-semibold">
      <Link className="mr-5" href="/">
        Chart
      </Link>
      <Link className="mr-5" href="/">
        Training
      </Link>
      <Link className="mr-5" href="/">
        Resources
      </Link>
      <Link className="" href="/">
        About
      </Link>
    </nav>
  )
}
