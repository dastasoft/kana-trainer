import Logo from './Logo'
import Navigation from './Navigation'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
  return (
    <header className="flex flex-col flex-wrap items-center justify-center bg-primary p-3 backdrop-blur-md sm:flex-row sm:justify-between sm:p-5">
      <Logo />
      <div className="flex items-center">
        <Navigation />
        <div className="ml-6 flex items-center">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
