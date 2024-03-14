import { AdminTable } from 'components/shared/AdminTable'
import { useQuery } from 'react-query'
import { Branch, Reservation } from 'types/types'
import { fetchBranches, fetchReservations } from 'utils/requests'
import { getReservationsTableColumns } from 'utils/table-config'
import { ExpandableReservationRow } from './ExpandableReservationRow'
import { useEffect, useMemo, useState } from 'react'
import { TabList } from 'components/shared/TabList'
import { AdminDayPicker } from 'components/shared/AdminDayPicker'
import { isSameDay } from 'date-fns'

export const AdminReservations = () => {
  const { data: reservations } = useQuery<Reservation[]>(
    'reservations',
    fetchReservations,
  )
  const { data: branches } = useQuery<Branch[]>('branches', fetchBranches)

  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>()

  const branchTabListItems = useMemo(
    () => branches?.map(branch => ({ id: branch.id, name: branch.name })),
    [branches],
  )

  const resevationDays = Array.from(
    new Set(
      reservations?.map(reservation => new Date(reservation.reservation.date)),
    ),
  )

  const columns = getReservationsTableColumns()
  const filteredReservations = useMemo(() => {
    let filteredReservations = reservations
    if (selectedDay) {
      filteredReservations = reservations?.filter(reservation => {
        return isSameDay(new Date(reservation.reservation.date), selectedDay)
      })
    }
    if (selectedBranchId) {
      filteredReservations = filteredReservations?.filter(
        reservation => reservation.reservation.branch_id === selectedBranchId,
      )
    }

    return filteredReservations
  }, [reservations, selectedDay, selectedBranchId])

  useEffect(() => {
    if (branchTabListItems && branchTabListItems.length > 0)
      setSelectedBranchId(branchTabListItems[0].id)
  }, [branchTabListItems])

  return (
    <div className='w-full'>
      <h1 className='text-white font-title text-subtitle'>Rezervace</h1>
      {branchTabListItems && branchTabListItems.length > 0 && (
        <TabList
          items={branchTabListItems}
          selectedTabId={branchTabListItems[0].id}
          setSelectedId={setSelectedBranchId}
          className={'justify-center'}
        />
      )}
      <AdminDayPicker
        availabileDays={resevationDays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      {filteredReservations && (
        <AdminTable
          data={filteredReservations}
          columns={columns}
          isPaginated={true}
          isFilterable={true}
          isExpandable={true}
          expandedRowRender={(
            reservation: Reservation,
            toggleExpanded: () => void,
          ) => (
            <ExpandableReservationRow
              reservation={reservation}
              toggleExpanded={toggleExpanded}
            />
          )}
        />
      )}
    </div>
  )
}
