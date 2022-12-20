import Logo from './Logo'
import Navigation from './Navigation'

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-primary p-5 backdrop-blur-md">
      <Logo />
      <Navigation />
    </header>
  )
}
