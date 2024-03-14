import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Dispatch } from 'react'

interface DateTimeInputProps {
  label: string
  date: Date | null | undefined
  setDate:
    | Dispatch<React.SetStateAction<Date>>
    | Dispatch<React.SetStateAction<Date | null>>
}

export const DateInput = ({ label, date, setDate }: DateTimeInputProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor='date' className='text-yellow text-12'>
        {label}
      </FormLabel>
      <Input
        id='date'
        type='date'
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        onChange={e => setDate(new Date(e.target.value))}
        placeholder='Select Date'
        border={'1px solid #ffea00'}
      />
    </FormControl>
  )
}
