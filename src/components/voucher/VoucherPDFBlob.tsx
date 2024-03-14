import { VoucherType } from 'types/types'
import { Vouchers } from './VoucherPDF'
import { BlobProvider } from '@react-pdf/renderer'

interface VoucherPDFBlobProps {
  vouchers: VoucherType[]
}

const VoucherPDFBlob = ({ vouchers }: VoucherPDFBlobProps) => {
  return (
    <BlobProvider document={<Vouchers vouchers={vouchers} />}>
      {({ loading }) => (loading ? 'Načítání voucheru...' : 'Stáhnout voucher')}
    </BlobProvider>
  )
}

export default VoucherPDFBlob
