import { Table } from '@tanstack/react-table'
import { AdminButton } from './AdminButton'
import { Select } from '@chakra-ui/react'

interface TablePaginationProps<T extends {}> {
  table: Table<T>
}

export const TablePagination = <T extends {}>({
  table,
}: TablePaginationProps<T>) => {
  const currentPage = table.getState().pagination.pageIndex + 1
  return (
    <div className='flex justify-between mt-20 items-center'>
      <AdminButton
        title='Předchozí'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      />

      <div className='flex items-center gap-20'>
        <p className='font-title text-white text-center'>
          Stránka {currentPage} z {table.getPageCount()}
        </p>
        <div className='flex items-center gap-10'>
          <span className='font-title text-white text-center'>
            Počet záznamů:
          </span>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            borderColor={'#ffea00'}
            className='text-white font-title w-fit'
            w={20}
          >
            {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <AdminButton
        title='Další'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      />
    </div>
  )
}
