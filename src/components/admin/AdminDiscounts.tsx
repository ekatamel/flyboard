import { AdminTable } from 'components/shared/AdminTable'
import { useQuery, useQueryClient } from 'react-query'
import { Discount } from 'types/types'
import { fetchDiscounts } from 'utils/requests'
import { getDiscountsTableColumns } from 'utils/table-config'

export const AdminDiscounts = () => {
  const queryClient = useQueryClient()
  const { data: discounts } = useQuery<Discount[]>('discounts', fetchDiscounts)

  const columns = getDiscountsTableColumns(queryClient)
  return (
    <div>
      {discounts && (
        <AdminTable
          data={discounts}
          columns={columns}
          isPaginated={false}
          isFilterable={false}
        />
      )}
    </div>
  )
}
