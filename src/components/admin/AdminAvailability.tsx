import { TabList } from 'components/shared/TabList'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Branch, Timeslot, TimeslotsByDayAndTime } from 'types/types'
import { fetchBranches, fetchTimeslots } from 'utils/requests'
import { AvailabilityByBranch } from './AvailabilityByBranch'
import { AdminDayPicker } from 'components/shared/AdminDayPicker'

export const AdminAvailability = () => {
  const { data: timeslots } = useQuery<Timeslot[]>('timeslots', fetchTimeslots)
  const { data: branches } = useQuery<Branch[]>('branches', fetchBranches)

  const branchTabListItems = useMemo(
    () => branches?.map(branch => ({ id: branch.id, name: branch.name })),
    [branches],
  )

  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>()

  const timeslotsReducedByBranchAndDay = timeslots?.reduce(
    (acc: TimeslotsByDayAndTime, timeslot) => {
      const {
        branch_id,
        date,
        time,
        total_time_slots,
        lecturers,
        available_time_slots,
        is_active,
        id,
      } = timeslot
      if (!acc[branch_id]) acc[branch_id] = {}

      const timeInfo = {
        timeslotId: id,
        time,
        isActive: is_active,
        isReserved: available_time_slots !== total_time_slots,
        lecturers,
      }

      if (!acc[branch_id][date]) {
        acc[branch_id][date] = {
          branch_id,
          scooters: total_time_slots / 12,
          lecturers,
          timeslots: [timeInfo],
        }
      } else {
        acc[branch_id][date].timeslots.push(timeInfo)
      }

      return acc
    },
    {},
  )

  useEffect(() => {
    if (branchTabListItems && branchTabListItems.length > 0)
      setSelectedBranchId(branchTabListItems[0].id)
  }, [branchTabListItems])

  return (
    <div>
      {branchTabListItems && branchTabListItems.length > 0 && (
        <TabList
          items={branchTabListItems}
          selectedTabId={branchTabListItems[0].id}
          setSelectedId={setSelectedBranchId}
          className={'justify-center'}
        />
      )}
      {selectedBranchId &&
        timeslotsReducedByBranchAndDay &&
        timeslotsReducedByBranchAndDay[selectedBranchId] && (
          <>
            <AdminDayPicker
              availabileDays={Object.keys(
                timeslotsReducedByBranchAndDay[selectedBranchId],
              ).map(date => new Date(date))}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <AvailabilityByBranch
              branchAvailability={
                timeslotsReducedByBranchAndDay[selectedBranchId]
              }
              selectedDay={selectedDay}
            />
          </>
        )}
    </div>
  )
}
