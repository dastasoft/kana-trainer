import Link from 'next/link'

import Button from '../Button'

const CTA = () => (
  <section className="first container mx-auto flex flex-col items-center justify-center">
    <img
      className="mb-10 w-5/6 rounded object-cover object-center md:w-3/6 lg:w-2/6"
      alt="hero"
      src="https://dummyimage.com/720x600"
    />
    <div className="w-full text-center lg:w-2/3">
      <h1 className="mb-4 text-center text-3xl font-medium sm:text-4xl">
        Learn <span className="gradient">Hiragana</span> and{' '}
        <span className="gradient">Katakana</span> in a fun way and in no time.
      </h1>
      <p className="mb-8 leading-relaxed">
        Start your journey of learning Japanese and learn two silabaries at
        once.
      </p>
      <div className="flex items-center justify-center">
        <Link href="/charts" className="mr-5">
          <Button as="div">Start Learning</Button>
        </Link>
        <Link href="/training">
          <Button as="div">Start Training</Button>
        </Link>
      </div>
    </div>
  </section>
)

export default CTA
