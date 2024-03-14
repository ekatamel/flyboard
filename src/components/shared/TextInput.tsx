import clsx from 'clsx'

interface TextInputProps {
  value: string
  setValue: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  type?: string
}

export const TextInput = ({
  value,
  setValue,
  placeholder,
  disabled,
  className,
  type = 'text',
}: TextInputProps) => {
  return (
    <input
      type={type}
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      className={clsx(
        className,
        'h-34 xl:h-44 px-8 border bg-black font-body focus:outline-none focus:border-yellow text-white block text-12 xl:text-16 rounded',
        disabled ? 'border-gray' : 'border-white',
      )}
      onChange={e => setValue(e.target.value)}
    />
  )
}
