import { fetchTimeslots } from 'utils/requests'
import { useQuery } from 'react-query'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { Timeslot } from 'types/types'

export const Timeslots = () => {
  const { data: timeslots } = useQuery<Timeslot[]>('timeslots', fetchTimeslots)

  return (
    <div>
      <h1 className='font-title text-subtitle text-center mb-20'>Timeslots</h1>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Available timeslots</Th>
              <Th>Total timeslots</Th>
              <Th>Branch ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {timeslots?.map((timeslot: any) => {
              return (
                <Tr key={timeslot.id}>
                  <Td>{timeslot.id}</Td>
                  <Td>{format(new Date(timeslot.date), 'dd.MM.yyyy')}</Td>
                  <Td>{timeslot.time}</Td>
                  <Td>{timeslot.available_time_slots}</Td>
                  <Td>{timeslot.total_time_slots}</Td>
                  <Td>{timeslot.branch_id}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
