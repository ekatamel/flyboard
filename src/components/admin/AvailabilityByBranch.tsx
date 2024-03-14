import { AdminTable } from 'components/shared/AdminTable'
import { Lecturer, TimeInfo, TimeslotsByDay } from 'types/types'
import { isSameDay } from 'date-fns'
import { getAvailabilityTableColumns } from 'utils/table-config'
import { ExpandedAvailabilityRow } from './ExpandedAvailabilityRow'

interface AvailabilityByBranchProps {
  branchAvailability: {
    [date: string]: {
      branch_id: number
      scooters: number
      lecturers: Lecturer[]
      timeslots: TimeInfo[]
    }
  }
  selectedDay: Date | undefined
}

export const AvailabilityByBranch = ({
  branchAvailability,
  selectedDay,
}: AvailabilityByBranchProps) => {
  const tableData = Object.keys(branchAvailability).map(date => {
    return {
      date,
      ...branchAvailability[date],
    }
  })

  const filteredTableData = selectedDay
    ? tableData.filter(tableRow =>
        isSameDay(new Date(tableRow.date), selectedDay),
      )
    : tableData

  const columns = getAvailabilityTableColumns()

  return (
    <AdminTable
      data={filteredTableData}
      columns={columns}
      isPaginated={true}
      isFilterable={false}
      isExpandable={true}
      expandedRowRender={(
        timeslot: TimeslotsByDay,
        toggleExpanded: () => void,
      ) => (
        <ExpandedAvailabilityRow
          timeslot={timeslot}
          toggleExpanded={toggleExpanded}
        />
      )}
    />
  )
}
