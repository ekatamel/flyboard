import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import { useState } from 'react'
import { TablePagination } from './TablePagination'
import { SortingArrows } from './SortingArrows'

interface AdminTableProps<T extends {}> {
  data: T[]
  columns: ColumnDef<T, any>[]
  globalFilter?: string
  setGlobalFilter?: (globalFilter: string) => void
  isPaginated?: boolean
  isFilterable?: boolean
  isExpandable?: boolean
  expandedRowRender?: (row: any, toggleExpanded: () => void) => JSX.Element
}

export const AdminTable = <T extends {}>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  isPaginated = false,
  isExpandable = false,
  expandedRowRender,
}: AdminTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const [expandedIndex, setExpandedIndex] = useState<number>(-1)

  const handleChange = (index: number) => {
    expandedIndex === index ? setExpandedIndex(-1) : setExpandedIndex(index)
  }

  const table = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      pagination: isPaginated ? pagination : undefined,
      globalFilter,
    },
  })

  return (
    <TableContainer className='mt-30'>
      <Accordion allowToggle index={expandedIndex} onChange={handleChange}>
        <Table>
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      color={'#ffea00'}
                      fontFamily={'Bebas Neue'}
                      fontSize={18}
                      fontWeight={'normal'}
                      borderColor={'#ffea00'}
                      padding={'8px 12px'}
                      style={{ width: header.getSize() }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {header.column.getCanSort() && (
                        <SortingArrows header={header} />
                      )}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>

          {table.getRowModel().rows.map((row, index) => {
            return (
              <AccordionItem
                className='text-white font-title text-18 border-none'
                display={'table-row-group'}
                key={row.id}
              >
                {({ isExpanded }) => (
                  <>
                    <Tr>
                      {row.getVisibleCells().map(cell => {
                        return (
                          <Td
                            key={cell.id}
                            borderColor={'#ffea00'}
                            borderBottom={
                              isExpanded ? 'none' : '1px solid #ffea00'
                            }
                            padding={'8px 12px'}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Td>
                        )
                      })}
                    </Tr>
                    {isExpandable && (
                      <Tr>
                        <Td
                          colSpan={columns.length}
                          padding={0}
                          border={'none'}
                          className='border-b border-red'
                        >
                          <AccordionPanel className='bg-darkGray border-b border-yellow'>
                            {expandedRowRender &&
                              expandedRowRender(row.original, () =>
                                handleChange(index),
                              )}
                          </AccordionPanel>
                        </Td>
                      </Tr>
                    )}
                  </>
                )}
              </AccordionItem>
            )
          })}
        </Table>
      </Accordion>
      {isPaginated && <TablePagination table={table} />}
    </TableContainer>
  )
}
