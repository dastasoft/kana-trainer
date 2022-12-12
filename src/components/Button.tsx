import type { ReactNode } from 'react'

type ButtonOwnProps<T extends React.ElementType> = {
  children: ReactNode
  flavor?: 'regular' | 'unselected' | 'selected' | 'correct' | 'wrong'
  variant?: '3d' | 'flat'
  as?: T | 'button' | 'div'
}

type ButtonProps<T extends React.ElementType> = ButtonOwnProps<T> &
  React.ComponentPropsWithoutRef<T>

const FLAVORS = {
  regular: {
    top: 'bg-red-600',
    bottom: 'bg-red-800',
  },
  unselected: {
    top: 'bg-black',
    bottom: 'bg-black',
  },
  selected: {
    top: 'bg-highlight',
    bottom: 'bg-yellow-800',
  },
  correct: {
    top: 'bg-green-600',
    bottom: 'bg-green-800',
  },
  wrong: {
    top: 'bg-red-600',
    bottom: 'bg-red-800',
  },
}

export default function Button<T extends React.ElementType = 'button'>({
  children = 'Button',
  flavor = 'regular',
  variant = '3d',
  as = 'button',
  className,
  disabled,
  ...otherProps
}: ButtonProps<T>) {
  const Component = as
  const isOnTestMode = flavor === 'correct' || flavor === 'wrong'

  return (
    <Component
      {...otherProps}
      disabled={disabled}
      className={`${className} pointer-events-none flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-x border-b-2 border-primary text-center text-white ${
        !isOnTestMode && 'hover:bg-yellow-800'
      } ${FLAVORS[flavor].bottom} ${
        disabled && 'cursor-not-allowed bg-gray-800'
      }`}
    >
      <div
        className={`pointer-events-auto w-full whitespace-nowrap rounded-lg border-y-2 border-x border-primary py-2 px-4 ${
          !isOnTestMode && 'hover:bg-highlight'
        } ${FLAVORS[flavor].top} ${
          disabled && 'cursor-not-allowed bg-gray-600'
        }`}
      >
        {children}
      </div>
      {variant !== 'flat' && <div className="h-2" />}
    </Component>
  )
}
