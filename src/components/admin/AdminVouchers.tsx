import { AdminTable } from 'components/shared/AdminTable'

import { useQuery } from 'react-query'
import {
  AdminVoucher,
  Filters,
  Merchant,
  ModifiedAdminVoucher,
  VoucherState,
} from 'types/types'
import { fetchMerchants, fetchVouchers } from 'utils/requests'
import { VoucherStats } from './VoucherStats'
import { filterVouchers, formatDate } from 'utils/utils'
import { useMemo, useState } from 'react'
import { getAdminVouchersTableColumns } from 'utils/table-config'
import { AdminFilters } from './AdminFilters'
import { DebouncedInput } from 'components/shared/DebounceInput'
import { ExpandableVoucherRow } from './ExpandableVoucherRow'

export const AdminVouchers = () => {
  const { data: vouchers } = useQuery<AdminVoucher[]>('vouchers', fetchVouchers)
  const { data: merchants } = useQuery<Merchant[]>('merchants', fetchMerchants)

  const merchantsMap = new Map(
    merchants?.map(merchant => [merchant.id, merchant.code]),
  )

  const [filters, setFilters] = useState<Filters | null>(null)
  const [globalFilter, setGlobalFilter] = useState('')

  const modifiedVouchers: ModifiedAdminVoucher[] | undefined = vouchers?.map(
    voucher => {
      return {
        ...voucher,
        status: VoucherState[voucher.status],
        valid_until: formatDate(voucher.valid_until),
        redeemed_date: voucher.redeemed_date
          ? formatDate(voucher.redeemed_date)
          : '-',
        merchantName: merchantsMap.get(voucher.merchant_id),
      }
    },
  )

  const columns = getAdminVouchersTableColumns()

  const filteredVouchers = useMemo(() => {
    return filterVouchers(filters, modifiedVouchers)
  }, [filters, modifiedVouchers])

  return (
    <div className='w-full'>
      <h1 className='text-white font-title text-subtitle'>Vouchery</h1>

      {filteredVouchers && (
        <>
          <VoucherStats vouchers={filteredVouchers} />
          <div className='flex justify-between mt-60'>
            <AdminFilters
              data={filteredVouchers}
              filters={filters}
              setFilters={setFilters}
            />
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Hledat'
            />
          </div>
          <AdminTable
            data={filteredVouchers}
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            isPaginated={true}
            isFilterable={true}
            isExpandable={true}
            expandedRowRender={(
              voucher: ModifiedAdminVoucher,
              toggleExpanded: () => void,
            ) => (
              <ExpandableVoucherRow
                voucher={voucher}
                toggleExpanded={toggleExpanded}
              />
            )}
          />
        </>
      )}
    </div>
  )
}
