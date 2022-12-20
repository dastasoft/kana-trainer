import type { ReactNode } from 'react'

import type { HandleResponse } from '@/types/shared'

import ResponseSelector from '../ResponseSelector'

type QuestionPanelProps = {
  question: string
  children: ReactNode
  correctOption: string
  options: string[]
  handleResponse: HandleResponse
}

export default function QuestionPanel({
  question,
  children,
  correctOption,
  options,
  handleResponse,
}: QuestionPanelProps) {
  return (
    <div className="flex h-96 flex-col">
      <div className="mb-5 flex-1 rounded-lg bg-gray-700">
        <div className="relative h-full motion-safe:animate-fade-in-left">
          {children}
        </div>
      </div>
      <ResponseSelector
        question={question}
        correctOption={correctOption}
        options={options}
        handleResponse={handleResponse}
      />
    </div>
  )
}
