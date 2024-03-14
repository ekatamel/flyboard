import clsx from 'clsx'

interface ErrorProps {
  errorText: string
  className?: string
}

export const InputError = ({ errorText, className }: ErrorProps) => {
  return (
    <div
      className={clsx(
        'text-errorRed text-10 lg:text-sm font-title right-0',
        className ? className : 'text-right',
      )}
    >
      {errorText}
    </div>
  )
}
