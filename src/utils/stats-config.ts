interface StatsConfig {
  id: number
  title: string
  key:
    | 'totalVouchers'
    | 'usedVouchers'
    | 'activeVouchers'
    | 'notPaidVouchers'
    | 'reservedVouchers'
}

export const voucherStatsConfig: StatsConfig[] = [
  {
    id: 1,
    title: 'Celkem voucherů',
    key: 'totalVouchers',
  },
  {
    id: 2,
    title: 'Uplatněných',
    key: 'usedVouchers',
  },
  {
    id: 3,
    title: 'K uplatnění',
    key: 'activeVouchers',
  },
  {
    id: 4,
    title: 'Nezaplacených',
    key: 'notPaidVouchers',
  },
  {
    id: 5,
    title: 'Rezervovaný termín',
    key: 'reservedVouchers',
  },
]
