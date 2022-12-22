import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import chart from '@/public/locales/en/chart.json'

type RomajiTogglerProps = {
  displayRomaji: boolean
  setDisplayRomaji: Dispatch<SetStateAction<boolean>>
}

const RomajiToggler = ({
  displayRomaji,
  setDisplayRomaji,
}: RomajiTogglerProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text mr-3">{chart.displayRomaji}</span>
        <input
          type="checkbox"
          className="toggle-primary toggle toggle-md"
          checked={displayRomaji}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDisplayRomaji(event.target.checked)
          }
        />
      </label>
    </div>
  )
}

export default RomajiToggler
