import clsx from 'clsx'

interface AdminButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

export const AdminButton = ({
  title,
  onClick,
  disabled,
  className,
}: AdminButtonProps) => {
  return (
    <button
      className={clsx(
        'border rounded-lg px-16 py-8 text-14 font-title w-100 cursor-pointer',
        className
          ? className
          : disabled
          ? 'border-darkGray text-darkGray'
          : 'border-yellow text-yellow',
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type='button'
    >
      {title}
    </button>
  )
}
