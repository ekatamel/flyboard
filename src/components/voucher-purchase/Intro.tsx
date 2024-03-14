import { Layout } from 'components/shared/Layout'
import { Tile } from '../shared/Tile'
import { HappyFace } from 'assets/images/HappyFace'
import { Ticket } from 'assets/images/Ticket'
import location from 'assets/images/location.png'
import foot from 'assets/images/foot.png'
import clock from 'assets/images/clock.png'
import { useNavigate } from 'react-router-dom'

export const Intro = () => {
  const navigate = useNavigate()

  return (
    <Layout
      stepName='úvod'
      title='Máte voucher s Flyboardshow?'
      noPreviousNavigation={true}
      noNavigation={true}
    >
      <p className='text-white mt-20 text-center mb-10 font-bold text-14 xl:text-16'>
        Lekce na Flyboardu s profesionálními letci
      </p>
      <div className='w-fit mx-auto mt-20'>
        <p className='text-white flex items-center gap-10 pb-8 text-14 xl:text-16'>
          <img src={clock} alt='Clock icon' className='xl:w-30 w-24' />
          <span>Každý se naučí létat do 5 minut</span>
        </p>
        <p className='text-white flex items-center gap-10 pb-8 text-14 xl:text-16'>
          <img src={location} alt='Location icon' className='xl:w-30 w-24' />
          <span>Lokality po celé České Republice (10)</span>
        </p>
        <p className='text-white flex items-center gap-10 pb-8 text-14 xl:text-16'>
          <img src={foot} alt='Foot icon' className='xl:w-30 w-24' />
          <span>Omezení - velikost nohy min. EU 35</span>
        </p>
      </div>

      <div className='xl:mt-60 mt-20 flex flex-col gap-28 justify-center md:flex-row items-center mb-20 grow'>
        <Tile
          title='Mám vouhcer'
          icon={Ticket}
          onClick={() => navigate('/rezervace')}
        />
        <Tile
          title='Nemám ale chci!'
          icon={HappyFace}
          onClick={() => navigate('/nakup-voucheru')}
        />
      </div>
    </Layout>
  )
}
