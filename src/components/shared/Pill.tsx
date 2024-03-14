import clsx from 'clsx'

interface PillProps {
  text: string
  onClick?: () => void
  disabled?: boolean
  style?: Record<string | number, string & {}>
  className?: string
}

export const Pill = ({
  style,
  text,
  onClick,
  disabled,
  className,
}: PillProps) => {
  return (
    <div
      style={style}
      className={clsx(
        'w-100 lg:w-89  rounded-full text-black flex justify-center items-center  text-12 lg:text-14 cursor-pointer ',
        className ? className : 'h-32 lg:h-40 font-semibold',
      )}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </div>
  )
}
