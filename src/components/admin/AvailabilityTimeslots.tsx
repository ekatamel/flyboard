import { TimeInfo } from 'types/types'
import clsx from 'clsx'
import { Pill } from 'components/shared/Pill'

interface AvailabilityTimeslotsProps {
  timeslots: TimeInfo[]
  changedTimeslots: Record<number, boolean> | null
  setChangedTimeslots: React.Dispatch<
    React.SetStateAction<Record<number, boolean> | null>
  >
}

export const AvailabilityTimeslots = ({
  timeslots,
  changedTimeslots,
  setChangedTimeslots,
}: AvailabilityTimeslotsProps) => {
  return (
    <div className='w-full flex gap-20'>
      {timeslots.map(timeslot => {
        const { isActive, isReserved, time, timeslotId } = timeslot
        const isChangedActive =
          changedTimeslots?.[timeslotId] &&
          changedTimeslots[timeslotId] === true
        const isActiveTimeslot =
          (isActive && changedTimeslots?.[timeslotId] === undefined) ||
          isChangedActive

        const getPillColor = () => {
          if (isReserved) return 'bg-orange'
          if (isActiveTimeslot) return 'bg-yellow'
          return 'bg-pillGray'
        }

        return (
          <Pill
            key={timeslotId}
            text={time}
            className={clsx('font-normal h-30', getPillColor())}
            disabled={isReserved}
            onClick={() =>
              setChangedTimeslots(changedTimeslots => ({
                ...changedTimeslots,
                [timeslotId]: !changedTimeslots?.[timeslotId],
              }))
            }
          />
        )
      })}
    </div>
  )
}
