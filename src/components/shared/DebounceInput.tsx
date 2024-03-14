import { useEffect, useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className='relative'>
      <SearchIcon
        className='absolute top-10 left-10'
        color='#ffea00'
        boxSize={5}
      />
      <input
        {...props}
        className='bg-black text-yellow font-title border border-yellow rounded-md h-40 text-14 pl-38 pr-20 py-12 focus:outline-none w-200'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}
