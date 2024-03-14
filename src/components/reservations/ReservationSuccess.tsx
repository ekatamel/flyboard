import { Layout } from 'components/shared/Layout'
import { Button } from 'components/shared/Button'
import team from 'assets/images/team.jpeg'

export const ReservationSuccess = () => {
  return (
    <Layout
      stepName=''
      title='Těšíme se'
      bottomCenterPart={
        <div className='w-full'>
          <Button
            title='Flyboardshow.cz'
            variant='primary'
            position='center'
            link={'https://www.flyboardshow.cz/'}
            className='mt-20'
          />
        </div>
      }
    >
      <p className='text-white mt-20 xl:mt-10 lg:mt-38 text-14 lg:text-16 text-center px-20 sm:px-44 md:px-80 lg:px-100 xl:px-0 mb-40'>
        Do emailu jsme Ti poslali potvrzení o rezervaci. Na lekci doraž 10 minut
        před začátkem. S sebou plavky, ručník a dobrou náladu :).
      </p>

      <img
        src={team}
        alt='Team'
        className='w-full mt-24 lg:h-[50vh] object-cover px-20 sm:px-44 md:px-80 lg:px-100 xl:px-0'
      />
      <p className='text-white font-title text-14 lg:text-20 text-right mt-20 mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
        Já i celý Flyboard Show tým se na Tebe těšíme u vody!
      </p>
      <p className='text-white font-title text-14 lg:text-20 text-right mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
        Petr Civín
      </p>
    </Layout>
  )
}
