import { useFormikContext } from 'formik'
import { Order } from 'types/types'
import { Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { createCheckoutSession } from 'utils/requests'
import { useMutation } from 'react-query'

import { usePriceTotals } from 'hooks/usePriceTotals'
import { BasketTableRow } from '../voucher-purchase-form/BasketTableRow'
import { groupItemsAndCount, groupLessonsAndCount } from 'utils/utils'
import { Toast } from 'components/shared/Toast'
import { useToast } from '@chakra-ui/react'
import { usePrompt } from 'hooks/usePrompt'

import stripe from 'assets/images/stripe.svg'

const apiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
const stripePromise = apiKey && loadStripe(apiKey)

export const Payment = () => {
  const toast = useToast()
  usePrompt()

  const { values } = useFormikContext<Order>()

  const [clientSecret, setClientSecret] = useState<string>('')

  const { totalDiscountedPrice, discountValue } = usePriceTotals()
  const groupedLessons = groupLessonsAndCount(values.lessonType)
  const groupedExtras = groupItemsAndCount(values.lessonType, 'extras')
  const groupedMerch = groupItemsAndCount(values.lessonType, 'merch')

  const { mutate: createSession } = useMutation(createCheckoutSession, {
    onSuccess: data => {
      setClientSecret(data)
    },
    onError: () => {
      toast({
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast
            status={'error'}
            title={'Něco se pokazilo. Kontaktujte nás prosím.'}
          />
        ),
      })
    },
  })

  useEffect(() => {
    values.orderId && createSession(values.orderId)
  }, [createSession, values.orderId])

  const base64String =
    values?.qr_code && `data:image/png;base64,${values.qr_code}`

  return (
    <div className='w-screen h-fit flex flex-col-reverse lg:flex-row overflow-auto'>
      <div className='bg-black lg:w-1/2 py-60 lg:px-60 flex flex-col'>
        <h4 className='text-yellow font-title text-16 text-center lg:text-left'>
          Celková částka
        </h4>
        <p className='text-yellow font-title text-50 lg:text-heading lg:mb-30 text-center lg:text-left'>
          {totalDiscountedPrice},- CZK
        </p>

        <TableContainer
          display={{
            base: 'none',
            lg: 'block',
          }}
        >
          <Table>
            <Tbody className='text-white font-title'>
              {Object.values(groupedLessons).map(lessonType => {
                return (
                  <BasketTableRow
                    key={lessonType.lesson.id}
                    count={lessonType.count}
                    item={lessonType.lesson}
                    type='lessonType'
                    isHover={false}
                    noPadding={true}
                  />
                )
              })}
              {Object.values(groupedExtras).map(extraItem => {
                if (!extraItem) return null
                return (
                  <BasketTableRow
                    key={extraItem.id}
                    count={extraItem.quantity}
                    item={extraItem}
                    type='extras'
                    isHover={false}
                    noPadding={true}
                  />
                )
              })}
              {values.extras &&
                values.extras.length > 0 &&
                values.extras.map((extra, index) => {
                  return (
                    <BasketTableRow
                      key={index}
                      item={extra}
                      type='extras'
                      count={extra.quantity}
                      isHover={false}
                      noPadding={true}
                    />
                  )
                })}
              {Object.values(groupedMerch).map(merchItem => {
                if (!merchItem) return null
                return (
                  <BasketTableRow
                    key={merchItem.id}
                    count={merchItem.quantity}
                    item={merchItem}
                    type='merch'
                    isHover={false}
                    noPadding={true}
                  />
                )
              })}
              {values.merch &&
                values.merch.length > 0 &&
                values.merch.map((merch, index) => {
                  return (
                    <BasketTableRow
                      key={index}
                      item={merch}
                      type='merch'
                      count={merch.quantity}
                      isHover={false}
                      noPadding={true}
                    />
                  )
                })}
              {values.discountCodeId && (
                <Tr>
                  <Td border={'none'} padding={'5px'} className='text-yellow'>
                    <span className='mr-40'>Slevový kód</span>
                    <span className='text-yellow'>
                      {values.discountInfo?.code}
                    </span>
                  </Td>

                  <Td border={'none'} padding={'5px'} className='text-yellow'>
                    {values.discountInfo?.type === 'price' &&
                      `-${values.discountInfo?.discount.toFixed(0)}%`}
                    {values.discountInfo?.type === 'min' &&
                      `+ ${values.discountInfo?.discount} min`}
                  </Td>

                  <Td padding={'5px'} className='text-yellow'>
                    {discountValue},-{' '}
                  </Td>
                  <Td border={'none'} padding={'5px'} className=' text-yellow'>
                    CZK
                  </Td>
                </Tr>
              )}

              <Tr>
                <Td border={'none'} borderTop={'1px solid white'}></Td>

                <Td
                  border={'none'}
                  borderTop={'1px solid white'}
                  padding={'5px'}
                  className='text-white'
                >
                  CELKEM
                </Td>
                <Td
                  border={'none'}
                  borderTop={'1px solid white'}
                  padding={'5px'}
                >
                  {totalDiscountedPrice},-
                </Td>
                <Td
                  border={'none'}
                  borderTop={'1px solid white'}
                  padding={'5px'}
                >
                  CZK
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <div className='font-title text-center text-white mt-20 grow flex flex-col justify-center items-center'>
          <p className='text-24'>Pro platbu bankovním převodem</p>
          <div>
            <span>č. účtu: </span>
            <span className='text-yellow'>
              {process.env.REACT_APP_BANK_ACOUNT_NUMBER}
            </span>
          </div>
          <div>
            <span>Variabilní symbol: </span>
            <span className='text-yellow'>{values.variableSymbol}</span>
          </div>
          <div>
            <span>Zpráva pro příjemce: </span>
            <span className='text-yellow'>FBS</span>
          </div>
          <div>
            <span>Částka: </span>
            <span className='text-yellow'>{totalDiscountedPrice},- CZK</span>
          </div>
          {base64String && (
            <img
              src={base64String}
              alt='QR code'
              className='h-150 w-150 mt-20'
            />
          )}
        </div>

        <div className='text-yellow text-12 font-body lg:flex mt-30 justify-center hidden'>
          <div className='flex gap-5 items-center border-r border-yellow pr-40'>
            <span>Powered by </span> <img src={stripe} alt='Stripe logo' />
          </div>
          <div className='border-l border-yellow pl-40 flex gap-22'>
            <a
              href='https://stripe.com/en-cz/legal/consumer'
              target='_blank'
              rel='noreferrer'
            >
              Terms
            </a>

            <a
              href='https://stripe.com/en-cz/privacy'
              target='_blank'
              rel='noreferrer'
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
      <div className='lg:w-1/2 min-h-screen flex items-center bg-white'>
        <div id='checkout' className='w-full'>
          {clientSecret && stripePromise && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
  )
}
