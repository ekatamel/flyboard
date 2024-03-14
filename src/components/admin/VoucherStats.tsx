import { useVoucherStats } from 'hooks/useVoucherStats'
import { AdminVoucher, ModifiedAdminVoucher } from 'types/types'
import { voucherStatsConfig } from 'utils/stats-config'

interface VoucherStatsProps {
  vouchers: ModifiedAdminVoucher[]
}

export const VoucherStats = ({ vouchers }: VoucherStatsProps) => {
  const voucherStats = useVoucherStats(vouchers)

  return (
    <div className='flex flex-wrap justify-between gap-y-32 gap-x-60'>
      {voucherStatsConfig.map(voucher => {
        const { id, title, key } = voucher
        return (
          <div
            key={id}
            className='p-24 w-300 h-127 rounded-lg bg-darkGray border border-yellow font-title'
          >
            <p className='text-white text-20'>{title}</p>

            <p className='text-yellow text-37'>{voucherStats[key]}</p>
          </div>
        )
      })}
    </div>
  )
}
