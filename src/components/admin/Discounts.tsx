import { fetchDiscounts } from 'utils/requests'
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

export const Discounts = () => {
  const { data: discounts } = useQuery<Discount[]>('discounts', fetchDiscounts)

  return (
    <div>
      <h1 className='font-title text-subtitle text-center mb-20'>Discounts</h1>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Discount code</Th>
              <Th>Discount type</Th>
              <Th>Discount value</Th>
              <Th>Discount description</Th>
              <Th>Quantity in stock</Th>
              <Th>Quantity remaining</Th>
              <Th>Valid from</Th>
              <Th>Valid until</Th>
            </Tr>
          </Thead>
          <Tbody>
            {discounts?.map((discount: any) => {
              return (
                <Tr key={discount.id}>
                  <Td>{discount.discount_code}</Td>
                  <Td>{discount.discount_type}</Td>
                  <Td>{discount.discount_value}</Td>
                  <Td>{discount.discount_description}</Td>
                  <Td>{discount.quantity_stock}</Td>
                  <Td>{discount.quantity_remaining}</Td>
                  <Td>{format(new Date(discount.valid_from), 'dd.MM.yyyy')}</Td>
                  <Td>{format(new Date(discount.valid_to), 'dd.MM.yyyy')}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
