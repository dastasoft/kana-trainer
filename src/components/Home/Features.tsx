import Image from 'next/image'

import home from '@/public/locales/en/home.json'

const Bullet = ({ text }: { text: string }) => (
  <li className="flex space-x-3">
    <svg
      className="h-5 w-5 shrink-0 text-highlight"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      ></path>
    </svg>
    <span className="text-base font-medium leading-tight text-white">
      {text}
    </span>
  </li>
)

const Features = () => {
  return (
    <section>
      <div className="space-y-12 px-4 py-8 lg:space-y-20 lg:py-24 lg:px-6">
        <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <div className="sm:text-lg">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
              {home.features.charts.title}
            </h2>
            <p className="mb-8 font-light lg:text-xl">
              {home.features.charts.description}
            </p>

            <ul
              role="list"
              className="my-7 space-y-5 border-t border-white pt-8"
            >
              <Bullet text={home.features.charts.bullets[0]} />
              <Bullet text={home.features.charts.bullets[1]} />
              <Bullet text={home.features.charts.bullets[2]} />
            </ul>
          </div>
          <Image
            className="mb-4 hidden w-full rounded-lg border border-primary lg:mb-0 lg:flex"
            src="/assets/images/charts.webp"
            height={720}
            width={600}
            alt="charts"
          />
        </div>
        <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <Image
            className="mb-4 hidden w-full rounded-lg border border-primary lg:mb-0 lg:flex"
            src="/assets/images/quizzes.webp"
            height={720}
            width={600}
            alt="quizzes"
          />
          <div className="text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white">
              {home.features.quizzes.title}
            </h2>
            <p className="mb-8 font-light lg:text-xl">
              {home.features.quizzes.description}
            </p>

            <ul
              role="list"
              className="my-7 space-y-5 border-t border-white pt-8"
            >
              <Bullet text={home.features.quizzes.bullets[0]} />
              <Bullet text={home.features.quizzes.bullets[1]} />
              <Bullet text={home.features.quizzes.bullets[2]} />
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
