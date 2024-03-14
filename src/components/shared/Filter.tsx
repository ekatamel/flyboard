import clsx from 'clsx'

interface FilterProps {
  text: string
  filterLabel?: string
  selected?: boolean
  onClick: () => void
  disabled?: boolean
  isAnimated?: boolean
}

export const Filter = ({
  text,
  selected,
  filterLabel,
  onClick,
  isAnimated,
}: FilterProps) => {
  return (
    <div
      className={clsx(
        'w-100 h-40 flex justify-center items-center font-title text-14 relative cursor-pointer border border-yellow',
        selected
          ? 'bg-yellow text-black'
          : ' text-yellow hover:shadow-custom-yellow transition ',
        isAnimated && 'animate-pulse',
      )}
      onClick={onClick}
    >
      <span className='text-white text-12 font-title absolute -top-18'>
        {filterLabel}
      </span>
      {text}
    </div>
  )
}
