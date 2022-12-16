import Logo from './Logo'
import Navigation from './Navigation'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
  return (
    <header className="flex w-full flex-col flex-wrap items-center justify-center bg-primary p-3 backdrop-blur-md sm:flex-row sm:justify-between sm:p-5">
      <div className="mb-3 flex w-full items-center justify-between sm:mb-0">
        <div className="w-full flex-auto">
          <Logo />
        </div>
        <ThemeSwitcher />
      </div>
      <Navigation />
    </header>
  )
}
