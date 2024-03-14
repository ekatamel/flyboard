import { fetchReservations } from 'utils/requests'
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
import { Discount } from 'types/types'
import { format } from 'date-fns'

export const Reservations = () => {
  const { data: reservations } = useQuery<Discount[]>(
    'reservations',
    fetchReservations,
  )

  return (
    <div>
      <h1 className='font-title text-subtitle text-center mb-20'>
        Reservations
      </h1>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Timeslot ID</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Contact person</Th>
              <Th>Status</Th>
              <Th>Date of creation</Th>
              <Th>Branch ID</Th>
              <Th>Email sent</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservations?.map((reservation: any) => {
              return (
                <Tr key={reservation.id}>
                  <Td>{reservation.id}</Td>
                  <Td>{reservation.timeslot_id}</Td>
                  <Td>{format(new Date(reservation.date), 'dd.MM.yyyy')}</Td>
                  <Td>{reservation.time}</Td>
                  <Td>{reservation.contact_person}</Td>
                  <Td>{reservation.status}</Td>
                  <Td>
                    {format(new Date(reservation.created_date), 'dd.MM.yyyy')}
                  </Td>
                  <Td>{reservation.branch_id}</Td>
                  <Td>{reservation.email_sent ? 'ANO' : 'NE'}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
