import { createColumnHelper } from '@tanstack/react-table'
import {
  Branch,
  Discount,
  ModifiedAdminVoucher,
  Reservation,
  ReservationState,
  ReservationStatus,
  TimeslotsByDay,
  VoucherState,
  VoucherStatus,
} from 'types/types'
import { formatDate, getPillStyles } from './utils'
import { Pill } from 'components/shared/Pill'
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteBranch, deleteDiscount } from './requests'
import { QueryClient } from 'react-query'
import { AccordionButton, AccordionIcon } from '@chakra-ui/react'
import checkmark from 'assets/images/checkmark.svg'
import crossIcon from 'assets/images/cross-icon.svg'

export const getAdminVouchersTableColumns = () => {
  const columnHelper = createColumnHelper<ModifiedAdminVoucher>()

  return [
    columnHelper.accessor('order_id', {
      header: 'Č. obj.',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('merchantName', {
      header: 'Od',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('code', {
      header: 'Kód',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('voucher_name', {
      id: 'voucher_name',
      header: 'Jméno na voucher',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('lesson_type_name', {
      header: 'Typ lekce',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('valid_until', {
      header: 'Platnost do',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('redeemed_date', {
      header: 'Uplatněno dne',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Stav',
      cell: info => {
        return (
          <Pill
            text={info.getValue()}
            style={getPillStyles(info.getValue() as VoucherStatus)}
            className='font-normal h-30'
          />
        )
      },
    }),
    columnHelper.display({
      id: 'AccordionButton',
      header: '',
      size: 0,
      cell: () => {
        return (
          <AccordionButton>
            <AccordionIcon />
          </AccordionButton>
        )
      },
    }),
  ]
}

export const getDiscountsTableColumns = (queryClient: QueryClient) => {
  const columnHelper = createColumnHelper<Discount>()

  return [
    columnHelper.accessor('discount_code', {
      header: 'Kód',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('discount_type', {
      header: 'Typ slevy',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('discount_value', {
      header: 'Sleva',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('quantity_stock', {
      header: 'Počet',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('quantity_remaining', {
      header: 'Zbývá',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('valid_from', {
      header: 'Platnost od',
      enableSorting: true,
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor('valid_to', {
      header: 'Platnost do',
      enableSorting: true,
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor('id', {
      id: 'delete',
      enableSorting: false,
      header: '',
      cell: info => (
        <DeleteIcon
          className={'cursor-pointer'}
          onClick={async () => {
            await deleteDiscount(info.row.original.id)
            queryClient.invalidateQueries('discounts')
          }}
        />
      ),
    }),
  ]
}

export const getBranchesTableColumns = (queryClient: QueryClient) => {
  const columnHelper = createColumnHelper<Branch>()

  return [
    columnHelper.accessor('name', {
      header: 'Název',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('address', {
      header: 'Adresa',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('long', {
      header: 'Long',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('lat', {
      header: 'Lat',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('map', {
      header: 'Google maps URL',
      enableSorting: true,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('id', {
      id: 'delete',
      enableSorting: false,
      header: '',
      cell: info => (
        <DeleteIcon
          className={'cursor-pointer'}
          onClick={async () => {
            await deleteBranch(info.row.original.id)
            queryClient.invalidateQueries('branches')
          }}
        />
      ),
    }),
  ]
}

export const getAvailabilityTableColumns = () => {
  const columnHelper = createColumnHelper<TimeslotsByDay>()

  return [
    columnHelper.accessor('date', {
      header: 'Datum',
      enableSorting: true,
      size: 300,
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor('lecturers', {
      header: 'Lektoří',
      enableSorting: true,
      size: 300,
      cell: info => {
        return info
          .getValue()
          .map(lecturer => lecturer.name)
          .join(', ')
      },
    }),
    columnHelper.display({
      id: 'From',
      header: 'Od',
      size: 300,
      cell: info => {
        const timeslots = info.row.original.timeslots
        const sortedTimeslots = timeslots.sort((a, b) => {
          return a.time.localeCompare(b.time)
        })
        return sortedTimeslots[0].time
      },
    }),
    columnHelper.display({
      id: 'Until',
      header: 'Do',
      size: 300,
      cell: info => {
        const timeslots = info.row.original.timeslots
        const sortedTimeslots = timeslots.sort((a, b) => {
          return a.time.localeCompare(b.time)
        })
        return sortedTimeslots[timeslots.length - 1].time
      },
    }),
    columnHelper.accessor('scooters', {
      header: 'Počet skútrů',
      enableSorting: true,
      size: 300,
      cell: info => info.getValue(),
    }),
    columnHelper.display({
      id: 'AccordionButton',
      header: '',
      size: 0,
      cell: () => {
        return (
          <AccordionButton>
            <AccordionIcon />
          </AccordionButton>
        )
      },
    }),
  ]
}

export const getReservationsTableColumns = () => {
  const columnHelper = createColumnHelper<Reservation>()

  return [
    columnHelper.accessor('reservation.id', {
      header: 'Rezervace',
      enableSorting: true,
      size: 300,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('reservation.date', {
      header: 'Datum',
      enableSorting: true,
      size: 300,
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor('reservation.time', {
      header: 'Čas',
      enableSorting: true,
      size: 300,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('lesson_type_name', {
      header: 'Lekce',
      enableSorting: true,
      size: 300,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('length', {
      header: 'Min',
      enableSorting: true,
      size: 300,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('code', {
      header: 'Voucher',
      enableSorting: true,
      size: 300,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('used_by', {
      header: 'Zákazník',
      enableSorting: true,
      size: 300,
      cell: info => {
        const customer = info.row.original.used_by
        if (customer) return `${customer.first_name} ${customer.last_name}`
        return ''
      },
    }),
    columnHelper.accessor('order_extras', {
      header: 'Video',
      enableSorting: true,
      size: 300,
      cell: info => {
        const video = info.row.original.order_extras
        return (
          <img
            src={video && video.length > 0 ? checkmark : crossIcon}
            alt='Video available icon'
          />
        )
      },
    }),
    columnHelper.accessor('order_merch', {
      header: 'Merch',
      enableSorting: true,
      size: 300,
      cell: info => {
        const merch = info.row.original.order_merch
        return (
          <img
            src={merch && merch.length > 0 ? checkmark : crossIcon}
            alt='Merch available icon'
          />
        )
      },
    }),
    columnHelper.accessor('status', {
      header: 'Stav',
      enableSorting: true,
      size: 300,
      cell: info => {
        const reservationStatus = info.getValue()
        return ReservationState[reservationStatus]
      },
    }),
    columnHelper.display({
      id: 'AccordionButton',
      header: '',
      size: 0,
      cell: () => {
        return (
          <AccordionButton>
            <AccordionIcon />
          </AccordionButton>
        )
      },
    }),
  ]
}
