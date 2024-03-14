import clsx from 'clsx'

interface BadgeProps {
  text: string
  isHighlighted?: boolean
}

export const Badge = ({ text, isHighlighted }: BadgeProps) => {
  return (
    <div
      className={clsx(
        'font-title absolute text-center text-7 lg:text-10 -rotate-45 left-2 lg:left-0 top-5 lg:top-10 w-64 -translate-x-[36%] lg:-translate-x-[24%]',
        isHighlighted ? 'text-yellow bg-black' : 'text-black bg-yellow',
      )}
    >
      {text}
    </div>
  )
}
