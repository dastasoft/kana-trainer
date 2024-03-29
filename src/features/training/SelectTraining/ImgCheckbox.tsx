import Image from 'next/image'
import type { ChangeEvent } from 'react'

type ImgCheckboxProps = {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  imgURL?: string
}

export default function ImgCheckbox({
  checked,
  onChange,
  label,
  imgURL = 'https://dummyimage.com/720x600',
}: ImgCheckboxProps) {
  return (
    <div className="form-control">
      <label className="label flex cursor-pointer flex-col justify-center">
        <input
          type="radio"
          name="radio-10"
          className="radio mr-3 hidden checked:bg-primary"
          checked={checked}
          onChange={onChange}
        />
        <span className="label-text text-xs">{label}</span>
        <div
          className={`w-full rounded-md border-4 ${
            checked ? 'border-primary' : 'border-transparent'
          }`}
        >
          <Image
            src={imgURL}
            alt={label}
            height={250}
            width={250}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
      </label>
    </div>
  )
}
