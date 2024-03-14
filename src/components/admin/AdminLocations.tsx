import { AdminTable } from 'components/shared/AdminTable'
import { useQuery, useQueryClient } from 'react-query'
import { Branch } from 'types/types'
import { fetchBranches } from 'utils/requests'
import { getBranchesTableColumns } from 'utils/table-config'

export const AdminLocations = () => {
  const queryClient = useQueryClient()
  const { data: branches } = useQuery<Branch[]>('branches', fetchBranches)
  const columns = getBranchesTableColumns(queryClient)

  return (
    <div>
      {branches && (
        <AdminTable
          data={branches}
          columns={columns}
          isPaginated={false}
          isFilterable={false}
        />
      )}
    </div>
  )
}
