import { Pill } from 'components/shared/Pill'
import { TimeslotForVoucher, Vouchers } from 'types/types'
import {
  getTimeSelectorPillColor,
  isBeforeNoon,
  isTimeBeforeNow,
} from 'utils/utils'
import { useFormikContext } from 'formik'
import clsx from 'clsx'

interface TimeSelectorProps {
  timeslots?: TimeslotForVoucher[]
}

export const TimeSelector = ({ timeslots }: TimeSelectorProps) => {
  const { values, setFieldValue } = useFormikContext<Vouchers>()

  if (!timeslots) return null

  const timeslotsBeforeNoon = timeslots.filter(timeslot =>
    isBeforeNoon(timeslot.time),
  )
  const timeslotsAfterNoon = timeslots.filter(
    timeslot => !isBeforeNoon(timeslot.time),
  )

  const selectTime = (timeslot: TimeslotForVoucher | null) => {
    setFieldValue('time', timeslot?.time || null)
    setFieldValue('timeslot_id', timeslot?.timeslot_id || null)
  }

  return (
    <div>
      <h2 className='font-title text-white text-center text-20 mt-20 mb-12'>
        Vyberte čas
      </h2>
      {timeslotsBeforeNoon.length > 0 && (
        <div className='px-20 sm:px-10'>
          <p className='font-title text-darkerGray text-16'>Ráno</p>
          <div className='flex gap-12 flex-wrap mt-10 mb-40'>
            {timeslotsBeforeNoon.map(timeslot => {
              const isSelected = values.time === timeslot.time
              return (
                <Pill
                  disabled={isTimeBeforeNow(timeslot)}
                  key={timeslot.timeslot_id}
                  text={timeslot.time}
                  onClick={() => selectTime(isSelected ? null : timeslot)}
                  className={clsx(
                    getTimeSelectorPillColor(isSelected, timeslot),
                    'h-32 font-bold',
                  )}
                />
              )
            })}
          </div>
        </div>
      )}
      {timeslotsAfterNoon.length > 0 && (
        <div className='px-20 sm:px-10'>
          <p className='font-title text-darkerGray text-16'>Odpoledne</p>
          <div className='flex gap-12 flex-wrap mt-10'>
            {timeslotsAfterNoon.map(timeslot => {
              const isSelected = values.time === timeslot.time

              return (
                <Pill
                  disabled={isTimeBeforeNow(timeslot)}
                  key={timeslot.timeslot_id}
                  text={timeslot.time}
                  onClick={() => selectTime(isSelected ? null : timeslot)}
                  className={clsx(
                    getTimeSelectorPillColor(isSelected, timeslot),
                    'h-32 font-bold',
                  )}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
