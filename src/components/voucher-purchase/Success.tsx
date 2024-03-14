import {
  fetchOrder,
  postSuccessfulPayment,
  retrieveCheckoutSession,
} from 'utils/requests'
import { Layout } from 'components/shared/Layout'
import { useQuery, useMutation } from 'react-query'
import team from 'assets/images/team.jpeg'
import { Button } from 'components/shared/Button'
import VoucherPDFLink from 'components/voucher/VoucherPDFLink'
import { useEffect, useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import App from 'App'

export const Success = () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const sessionId = urlParams.get('session_id')

  const { data: session, isLoading } = useQuery(
    'session',
    () => retrieveCheckoutSession(sessionId),
    {
      enabled: !!sessionId,
    },
  )

  const { data: order } = useQuery(
    'order',
    () => fetchOrder(session?.client_reference_id),
    {
      enabled: !!session?.client_reference_id,
    },
  )

  const { mutate: sendPayment } = useMutation(postSuccessfulPayment)

  useEffect(() => {
    if (session?.status === 'complete' && order && order.status !== 'Paid') {
      sendPayment(order.id)
    }
  }, [order, session?.status])

  if (!isLoading && !session) {
    return <App />
  }

  return (
    <Layout
      stepName=''
      isLoading={isLoading}
      title='Máš zaplaceno'
      bottomCenterPart={
        <Button
          title='Flyboardshow.cz'
          variant='primary'
          position='center'
          link={'https://www.flyboardshow.cz/'}
          isLoading={isLoading}
          className='mt-20'
        />
      }
      noNavigation={isLoading}
    >
      {isLoading ? (
        <div className='w-full flex justify-center items-center grow xl:h-[50vh]'>
          <Spinner
            thickness='3px'
            speed='0.65s'
            emptyColor='gray.600'
            color='#ffea00'
            size='xl'
          />
        </div>
      ) : (
        <>
          <div className='flex flex-wrap justify-center lg:flex-nowrap items-center lg:justify-between gap-20 mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
            <p className='text-white font-20'>
              Rezervuj si svůj let na flyboardshow.cz
            </p>
            <div className='flex gap-40'>
              <div className='h-30 py-6 px-24 bg-yellow text-black font-title flex items-center justify-center w-fit'>
                <a href='/rezervace'>Rezervovat</a>
              </div>
              {order && order.vouchers.length > 0 && (
                <div className='h-30 py-6 px-24 bg-yellow text-black font-title flex items-center justify-center w-fit whitespace-nowrap'>
                  <VoucherPDFLink vouchers={order.vouchers} />
                </div>
              )}
            </div>
          </div>
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
        </>
      )}
    </Layout>
  )
}
