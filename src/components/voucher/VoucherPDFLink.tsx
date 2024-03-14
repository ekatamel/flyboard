import { PDFDownloadLink } from '@react-pdf/renderer'
import { VoucherType } from 'types/types'
import { Vouchers } from './VoucherPDF'

interface VoucherPDFLinkProps {
  vouchers: VoucherType[]
}

const VoucherPDFLink = ({ vouchers }: VoucherPDFLinkProps) => {
  return (
    <PDFDownloadLink
      document={<Vouchers vouchers={vouchers} />}
      fileName={`voucher-${vouchers[0].code}.pdf`}
    >
      {() => 'Stáhnout voucher'}
    </PDFDownloadLink>
  )
}

export default VoucherPDFLink
