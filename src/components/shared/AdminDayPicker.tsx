import { Lecturer, TimeInfo } from 'types/types'

import { DayPicker } from 'react-day-picker'
import { cs } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import 'styles/admin-day-picker.css'
import styles from 'styles/day-picker.module.css'
import { getFirstAvailableMonth } from 'utils/utils'

interface AdminAvailabilityProps {
  availabileDays: Date[]
  selectedDay: Date | undefined
  setSelectedDay: (date: Date | undefined) => void
}

export const AdminDayPicker = ({
  availabileDays,
  selectedDay,
  setSelectedDay,
}: AdminAvailabilityProps) => {
  return (
    <DayPicker
      mode='single'
      className={'mt-20 text-white mx-auto'}
      selected={selectedDay}
      locale={cs}
      defaultMonth={getFirstAvailableMonth(availabileDays)}
      modifiers={{
        available: availabileDays,
      }}
      modifiersClassNames={{
        available: styles.available,
        disabled: styles.disabled,
        selected: styles.selected,
      }}
      onSelect={date => setSelectedDay(date)}
    />
  )
}
