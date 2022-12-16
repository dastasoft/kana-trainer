import type { ReactNode } from 'react'

import ResponseSelector from '../ResponseSelector'

type QuestionPanelProps = {
  children: ReactNode
  correctOption: string
  options: string[]
  handleResponse: (isCorrect: boolean) => void
}

export default function QuestionPanel({
  children,
  correctOption,
  options,
  handleResponse,
}: QuestionPanelProps) {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col">
      <div className="relative mb-5 flex flex-1 rounded-lg bg-gray-700">
        <div className="flex w-full items-center justify-center motion-safe:animate-fade-in-left">
          {children}
        </div>
      </div>
      <ResponseSelector
        correctOption={correctOption}
        options={options}
        handleResponse={handleResponse}
      />
    </div>
  )
}
