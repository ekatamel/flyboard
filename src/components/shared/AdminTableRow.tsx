import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Collapse,
  IconButton,
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
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

interface AdminTableProps<T extends {}> {
  row: T
}

export const AdminTableRow = <T extends {}>({ row }: AdminTableProps<T>) => {
  return (
    <>
      {' '}
      <AccordionButton>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>Lalal</AccordionPanel>
    </>
  )
}
