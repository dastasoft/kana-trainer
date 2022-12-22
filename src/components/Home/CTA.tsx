import Image from 'next/image'
import Link from 'next/link'

import home from '@/public/locales/en/home.json'

import Button from '../Button'

const CTA = () => {
  return (
    <section className="first container mx-auto flex flex-col items-center justify-center">
      <Image
        className="mb-8 w-5/6 rounded object-cover object-center md:w-3/6 lg:w-2/6"
        alt="logo"
        height={500}
        width={500}
        src="/assets/images/logo-big.webp"
      />
      <div className="w-full text-center lg:w-2/3">
        <h1 className="mb-4 text-center text-3xl font-medium sm:text-4xl">
          Learn <span className="gradient">Hiragana</span> and{' '}
          <span className="gradient">Katakana</span> in a fun way and in no
          time.
        </h1>
        <p className="mb-8 leading-relaxed">{home.hero.subtitle}</p>
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <Link href="/charts" className="mb-5 sm:mb-0 sm:mr-5">
            <Button as="div">{home.hero.CTA}</Button>
          </Link>
          <Link href="/training">
            <Button as="div" flavor="unselected">
              {home.hero.CTA2}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA
