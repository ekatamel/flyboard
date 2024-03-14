import { ModifiedAdminVoucher, VoucherState, VoucherStatus } from 'types/types'

export const useVoucherStats = (vouchers: ModifiedAdminVoucher[]) => {
  const reservedVouchers = vouchers.filter(
    voucher => voucher.status === VoucherState[VoucherStatus.RESERVED],
  )

  const notPaidVouchers = vouchers.filter(
    voucher => voucher.status === VoucherState[VoucherStatus.NOT_PAID],
  )
  const activeVouchers = vouchers.filter(
    voucher => voucher.status === VoucherState[VoucherStatus.ACTIVE],
  )
  const usedVouchers = vouchers.filter(
    voucher => voucher.status === VoucherState[VoucherStatus.USED],
  )

  return {
    totalVouchers: vouchers.length,
    reservedVouchers: reservedVouchers.length,
    notPaidVouchers: notPaidVouchers.length,
    activeVouchers: activeVouchers.length,
    usedVouchers: usedVouchers.length,
  }
}
