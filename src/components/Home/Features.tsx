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

const Features = () => (
  <section>
    <div className="mx-auto max-w-screen-xl space-y-12 px-4 py-8 lg:space-y-20 lg:py-24 lg:px-6">
      <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
        <div className="sm:text-lg">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
            Charts
          </h2>
          <p className="mb-8 font-light lg:text-xl">
            Learn all the kanas throught the complete charts, all the
            information you need.
          </p>

          <ul role="list" className="my-7 space-y-5 border-t border-white pt-8">
            <Bullet text=" Both alphabets" />
            <Bullet text="Stroke Order" />
            <Bullet text="Sound example" />
          </ul>
        </div>
        <img
          className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
          src="https://dummyimage.com/720x600"
          alt="hero"
        />
      </div>
      <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
        <img
          className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
          src="https://dummyimage.com/720x600"
          alt="hero"
        />
        <div className="text-gray-400 sm:text-lg">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white">
            Quizz Training
          </h2>
          <p className="mb-8 font-light lg:text-xl">
            Practice with a flashcard like quizz to train every recognition you
            will need to use both alphabets every day.
          </p>

          <ul role="list" className="my-7 space-y-5 border-t border-white pt-8">
            <Bullet text="Kana Recognition" />
            <Bullet text="Sound Recognition" />
            <Bullet text="Reverse Recognition" />
          </ul>
        </div>
      </div>
    </div>
  </section>
)

export default Features
