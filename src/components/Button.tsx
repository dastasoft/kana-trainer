import type { ReactNode } from 'react'

type ButtonOwnProps<T extends React.ElementType> = {
  children: ReactNode
  variant?: 'regular' | 'outlined' | 'success' | 'error' | 'flat'
  as?: T | 'button' | 'div'
}

type ButtonProps<T extends React.ElementType> = ButtonOwnProps<T> &
  React.ComponentPropsWithoutRef<T>

export default function Button<T extends React.ElementType = 'button'>({
  children = 'Button',
  variant = 'regular',
  as = 'button',
  ...otherProps
}: ButtonProps<T>) {
  const Component = as

  return (
    <Component
      {...otherProps}
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-red-800 text-center text-white"
    >
      <div className="w-full whitespace-nowrap rounded-lg border-2 border-primary bg-red-600 py-2 px-4 hover:bg-highlight">
        {children}
      </div>
      {variant !== 'flat' && <div className="h-2" />}
    </Component>
  )
}
