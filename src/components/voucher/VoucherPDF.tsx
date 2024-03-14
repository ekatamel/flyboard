import './voucher.css'
import voucherImage from 'assets/images/voucher-image.png'
import logo from 'assets/images/old-logo.png'

import QRcode from 'assets/images/QRcode.png'
import BebasNeue from 'assets/fonts/BebasNeue-Regular.ttf'
import RobotoMedium from 'assets/fonts/Roboto-Medium.ttf'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Link,
} from '@react-pdf/renderer'
import { Facebook } from 'assets/images/Facebook'
import { Instagram } from 'assets/images/Instagram'
import { VoucherType } from 'types/types'
import { format } from 'date-fns'

Font.register({
  family: 'BebasNeue',
  src: BebasNeue,
})

Font.register({
  family: 'Roboto',
  src: RobotoMedium,
})

interface VoucherProps {
  voucher: VoucherType
}

export const Voucher = ({ voucher }: VoucherProps) => {
  return (
    <Page style={styles.container} orientation='landscape' size='RA4'>
      <View>
        <View style={styles.info}>
          <Text style={styles.title}>Let na Flyboardu</Text>
          <Text style={styles.subtitle}>
            Flyboarding je adrenalinový sport jako žádný jiný a tento voucher je
            tvoje polovina cesty k němu
          </Text>
          <Text style={styles.name}>{voucher.voucher_name}</Text>
          <View style={styles.code}>
            <Text style={styles.codeTitle}>Kód voucheru </Text>
            <Text>{voucher.code}</Text>
          </View>
          <Text style={styles.text}>
            Ničeho se neboj. Každý se naučí létat do 5 minut! Pak už budeš létat
            nad hladinou jako superman, nebo skákat ve vodě jako delfín.
          </Text>
          <Text style={styles.lessonType}>{voucher.lesson_type_name}</Text>
          <View style={styles.instructions}>
            <Text style={styles.instructionsText}>
              Rezervuj na www.flyboardshow.cz
            </Text>
            <Text style={styles.instructionsText}>nebo</Text>
            <Text style={styles.instructionsText}>stačí naskenovat QR kód</Text>
          </View>
          <View style={styles.social}>
            <Link src='https://www.instagram.com/flyboardshow.cz'>
              <Instagram />
            </Link>
            <Image src={logo} style={styles.logo} />
            <Link src='https://www.facebook.com/Flyboardshow.cz'>
              <Facebook />
            </Link>
          </View>
        </View>

        <View style={styles.validity}>
          <Text>Platnost do </Text>
          <Text style={styles.validityUntil}>
            {format(new Date(voucher.valid_until), 'dd.MM.yyyy')}
          </Text>
        </View>
      </View>

      <View style={styles.voucherContainer}>
        <Image src={voucherImage} style={styles.voucher} />
      </View>

      <Image src={QRcode} style={styles.qrCode} />
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '40px',
    position: 'relative',
    margin: '0px',
  },
  info: {
    width: '400px',
    paddingTop: '80px',
    paddingLeft: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffea00',
    fontSize: '48px',
    fontFamily: 'BebasNeue',
    marginBottom: '16px',
  },
  name: {
    fontFamily: 'BebasNeue',
    color: 'white',
    fontSize: '22.5px',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    padding: '2px 32px',
    marginBottom: '16px',
    height: '33px',
  },
  code: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    fontFamily: 'BebasNeue',
    color: '#ffea00',
    marginBottom: '16px',
  },
  codeTitle: {
    color: 'white',
  },
  text: {
    fontSize: '11px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '16px',
    lineHeight: '1.5px',
    fontFamily: 'Roboto',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '25px',
    marginTop: '-8px',
    fontSize: '12px',
    lineHeight: '1.5px',
    fontFamily: 'Roboto',
  },
  voucherContainer: {
    marginTop: '120px',
    marginRight: '60px',
    width: '304px',
    display: 'flex',
    alignItems: 'center',
  },
  voucher: {
    width: '100%',
  },
  lessonType: {
    fontFamily: 'BebasNeue',
    color: '#ffea00',
    fontSize: 31,
    marginBottom: 8,
  },
  instructions: {
    color: 'white',
    fontSize: 12,
    marginBottom: 16,
    lineHeight: '1.5px',
    fontFamily: 'Roboto',
  },
  instructionsText: {
    textAlign: 'center',
    margin: 'auto',
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  socialLogo: {
    width: '25px',
    height: '25px',
  },
  qrCode: {
    position: 'absolute',
    width: '120px',
    height: '120px',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
  },
  validity: {
    width: '300px',
    fontFamily: 'BebasNeue',
    color: 'white',
    fontSize: 11,
    position: 'absolute',
    bottom: 13,
    left: 13,
    display: 'flex',
    flexDirection: 'row',
  },
  validityUntil: {
    color: '#ffea00',
  },
  logo: {
    width: '152px',
  },
})

interface VouchersProps {
  vouchers: VoucherType[]
}

export const Vouchers = ({ vouchers }: VouchersProps) => {
  return (
    <Document pageLayout='twoColumnLeft'>
      {vouchers.map(voucher => (
        <Voucher key={voucher.id} voucher={voucher} />
      ))}
    </Document>
  )
}

export const SingleVoucher = ({ voucher }: VoucherProps) => {
  return (
    <Document pageLayout='twoColumnLeft'>
      <Voucher voucher={voucher} />
    </Document>
  )
}
