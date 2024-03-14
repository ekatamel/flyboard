import { fetchVouchers } from 'utils/requests'
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

export const Vouchers = () => {
  const { data: vouchers } = useQuery<Discount[]>('vouchers', fetchVouchers)

  return (
    <div>
      <h1 className='font-title text-subtitle text-center mb-20'>Vouchers</h1>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Merchant ID</Th>
              <Th>Code</Th>
              <Th>Status</Th>
              <Th>Voucher name</Th>
              <Th>Lesson type code</Th>
              <Th>Length (min)</Th>
              <Th>Price</Th>
              <Th>Valid until</Th>
              <Th>Date of creation</Th>
              <Th>Order ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vouchers?.map((voucher: any) => {
              return (
                <Tr key={voucher.id}>
                  <Td>{voucher.id}</Td>
                  <Td>{voucher.merchant_id}</Td>
                  <Td>{voucher.code}</Td>
                  <Td>{voucher.status}</Td>
                  <Td>{voucher.voucher_name}</Td>
                  <Td>{voucher.lesson_type_code}</Td>
                  <Td>{voucher.length}</Td>
                  <Td>{voucher.price}</Td>
                  <Td>{format(new Date(voucher.valid_until), 'dd.MM.yyyy')}</Td>
                  <Td>
                    {format(new Date(voucher.created_date), 'dd.MM.yyyy')}
                  </Td>
                  <Td>{voucher.order_id}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
