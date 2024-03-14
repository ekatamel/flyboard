import './voucher.css'

import QRcode from 'assets/images/QRcode.png'
import facebook from 'assets/images/facebook.svg'
import instagram from 'assets/images/instagram.svg'

import voucher from 'assets/images/voucher-image.png'
import logo from 'assets/images/old-logo.png'

export const Voucher = () => {
  return (
    <div className='container lg:py-80 lg:px-60 py-30 px-22'>
      <div className='info'>
        <h1 className='text-20 lg:text-48 text-yellow font-title'>
          Let na Flyboardu
        </h1>
        <p className='subtitle lg:text-12 text-8'>
          Flyboarding je adrenalinový sport jako žádný jiný a tento voucher je
          tvoje polovina cesty k němu
        </p>
        <h2 className='name'>Jméno obdarovaného</h2>
        <div className='code'>
          <span className='code-title'>Kód voucheru </span>
          <span>fbs149480</span>
        </div>
        <p className='text'>
          Ničeho se neboj. Každý se naučí létat do 5 minut! Pak už budeš létat
          nad hladinou jako superman, nebo skákat ve vodě jako delfín.
        </p>
        <h3 className='lesson-type'>Doporučená</h3>
        <div className='instructions'>
          <span>Rezervuj na www.flyboardshow.cz</span>
          <span>nebo</span>
          <span>stačí naskenovat QR kód</span>
        </div>
        <div className='social'>
          <a
            href='https://www.instagram.com/flyboardshow.cz'
            target='_blank'
            rel='noopener noreferrer'
            className='socialLogo'
          >
            <img src={instagram} alt='Instagram logo' />
          </a>

          <img src={logo} alt='Flyboard logo' className='logo' />

          <a
            href='https://www.facebook.com/Flyboardshow.cz'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={facebook} alt='Facebook logo' />
          </a>
        </div>
      </div>
      <div className='voucher-container'>
        <img src={voucher} alt='Voucher preview' className='voucher' />
      </div>

      <div className='validity'>
        <span>Platnost do </span>
        <span className='validity-until'>15.10.2024</span>
      </div>
      <img src={QRcode} alt='QR code example' className='qr-code' />
    </div>
  )
}
