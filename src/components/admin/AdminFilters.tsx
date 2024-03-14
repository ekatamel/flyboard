import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
} from '@chakra-ui/react'
import {
  Filters,
  Merchant,
  ModifiedAdminVoucher,
  VoucherState,
} from 'types/types'
import { useQuery } from 'react-query'
import { fetchMerchants } from 'utils/requests'
import { useEffect } from 'react'
import { Filter } from 'assets/images/Filter'

interface AdminFiltersProps {
  data: ModifiedAdminVoucher[]
  filters: Filters | null
  setFilters: (filters: Filters | null) => void
}

export const AdminFilters = ({
  data,
  filters,
  setFilters,
}: AdminFiltersProps) => {
  const { data: merchants } = useQuery<Merchant[]>('merchants', fetchMerchants)

  const merchantIds = [...new Set(data?.map(voucher => voucher.merchant_id))]
  const lessonTypeNames = [
    ...new Set(data?.map(voucher => voucher.lesson_type_name)),
  ]
  const validityDays = [...new Set(data?.map(voucher => voucher.valid_until))]

  const merchantsMap = new Map(
    merchants?.map(merchant => [merchant.id, merchant]),
  )

  const initialFilters: Filters = {
    merchants: {
      title: 'Prodejci',
      filters: merchantIds.reduce((acc, merchantId) => {
        return {
          ...acc,
          [merchantId]: {
            id: merchantId,
            label: merchantsMap.get(merchantId)?.code,
            isSelected: true,
          },
        }
      }, {}),
    },
    lessonTypes: {
      title: 'Typ lekce',
      filters: lessonTypeNames.reduce((acc, lessonTypeName) => {
        return {
          ...acc,
          [lessonTypeName]: {
            label: lessonTypeName,
            isSelected: true,
          },
        }
      }, {}),
    },
    validityDays: {
      title: 'Platnost',
      filters: validityDays.reduce((acc, validityDay) => {
        return {
          ...acc,
          [validityDay]: {
            label: validityDay,
            isSelected: true,
          },
        }
      }, {}),
    },
    voucherStates: {
      title: 'Stav voucheru',
      filters: Object.values(VoucherState).reduce((acc, status) => {
        return {
          ...acc,
          [status]: {
            label: status,
            isSelected: true,
          },
        }
      }, {}),
    },
  }

  useEffect(() => {
    if (!filters && merchants) {
      setFilters(initialFilters)
    }
  }, [merchants, filters, setFilters, initialFilters])

  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <button className='border rounded-lg px-16 py-8 text-14 font-title w-fit border-yellow text-yellow flex items-center gap-10'>
          <Filter />
          Více filtrů
        </button>
      </PopoverTrigger>
      <PopoverContent className='px-10 py-10' borderRadius={'10px'}>
        <PopoverCloseButton />

        <PopoverBody>
          {filters &&
            Object.entries(filters).map(([key, value]) => {
              return (
                <div key={key} className='mb-10'>
                  <p className='text-white font-title text-18'>{value.title}</p>
                  {Object.entries(value.filters).map(
                    ([filterKey, filterValue]) => {
                      return (
                        <div key={filterKey} className='flex items-center mb-5'>
                          <input
                            type='checkbox'
                            className='w-16 h-16 accent-yellow'
                            id={filterKey}
                            name={filterKey}
                            defaultChecked={filterValue.isSelected}
                            onChange={e => {
                              setFilters({
                                ...filters,
                                [key]: {
                                  ...value,
                                  filters: {
                                    ...value.filters,
                                    [filterKey]: {
                                      ...filterValue,
                                      isSelected: e.target.checked,
                                    },
                                  },
                                },
                              })
                            }}
                          />
                          <label htmlFor={filterKey} className='ml-10 text-14'>
                            {filterValue.label}
                          </label>
                        </div>
                      )
                    },
                  )}
                </div>
              )
            })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
