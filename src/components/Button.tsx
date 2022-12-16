import type { ReactNode } from 'react'

type ButtonOwnProps<T extends React.ElementType> = {
  children: ReactNode
  flavor?: 'regular' | 'unselected' | 'selected' | 'correct' | 'wrong'
  variant?: '3d' | 'flat'
  disabled?: boolean
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
  disabled = false,
  ...otherProps
}: ButtonProps<T>) {
  const Component = as

  return (
    <Component
      {...otherProps}
      disabled={disabled}
      className={`${className} pointer-events-none flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-x border-b-2 border-primary text-center text-white ${
        FLAVORS[flavor].bottom
      } ${disabled && 'cursor-not-allowed'}`}
    >
      <div
        className={`pointer-events-auto w-full whitespace-nowrap rounded-lg border-y-2 border-x border-primary py-2 px-4 ${
          FLAVORS[flavor].top
        } ${disabled && 'cursor-not-allowed'}`}
      >
        {children}
      </div>
      {variant !== 'flat' && <div className="h-2" />}
    </Component>
  )
}
