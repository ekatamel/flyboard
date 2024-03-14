import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Header } from '@tanstack/react-table'

interface SortingProps<T extends {}> {
  header: Header<T, unknown>
}

export const SortingArrows = <T extends {}>({ header }: SortingProps<T>) => {
  return (
    <span className='pl-6 cursor-pointer'>
      {header.column.getIsSorted() === 'desc' ? (
        <TriangleDownIcon
          aria-label='sorted descending'
          w={3}
          color={
            header.column.getIsSorted()
              ? '#ffea00'
              : 'rgba(255, 255, 255, 0.46)'
          }
        />
      ) : (
        <TriangleUpIcon
          aria-label='sorted ascending'
          w={3}
          color={
            header.column.getIsSorted()
              ? '#ffea00'
              : 'rgba(255, 255, 255, 0.46)'
          }
        />
      )}
    </span>
  )
}
