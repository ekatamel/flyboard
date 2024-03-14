import { Layout } from 'components/shared/Layout'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { Order } from 'types/types'
import {
  formatPrice,
  groupItemsAndCount,
  groupLessonsAndCount,
} from 'utils/utils'
import { usePriceTotals } from 'hooks/usePriceTotals'
import { useCreateOrder } from 'hooks/useCreateOrder'

export const Summary = () => {
  const { values } = useFormikContext<Order>()

  const { totalDiscountedPrice, discountValue } = usePriceTotals()

  const groupedLessons = groupLessonsAndCount(values.lessonType)
  const groupedExtras = groupItemsAndCount(values.lessonType, 'extras')
  const groupedMerch = groupItemsAndCount(values.lessonType, 'merch')

  const { createAndSendOrder, isLoading } = useCreateOrder()

  return (
    <Layout
      stepName='Shrnutí'
      title='Nemáme tam chybu?'
      onNextStepClick={createAndSendOrder}
      isNextDisabled={isLoading}
    >
      <TableContainer
        overflowY={'auto'}
        className='mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0 md:mt-40 xl:mt-0 box-border'
      >
        <Table className='flex lg:table'>
          <Thead>
            <Tr className='flex flex-col lg:table-row border-t border-yellow xl:border-none'>
              <Th
                padding={{
                  base: '12px 24px 12px 0',
                  lg: '16px 24px 16px 0',
                }}
                paddingLeft={'0'}
                borderBottom={{
                  base: 'none',
                  lg: '1px solid rgba(255, 234, 0, 1)',
                }}
                fontSize={'14px'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                fontWeight={'normal'}
              >
                Jméno a příjmení
              </Th>
              <Th
                padding={{
                  base: '8px 24px 8px 0',
                  lg: '16px 24px 16px 24px',
                }}
                borderBottom={{
                  base: 'none',
                  lg: '1px solid rgba(255, 234, 0, 1)',
                }}
                fontSize={'14px'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                fontWeight={'normal'}
              >
                Email
              </Th>
              <Th
                padding={{
                  base: '8px 24px 8px 0',
                  lg: '16px 24px 16px 24px',
                }}
                borderBottom={'1px solid rgba(255, 234, 0, 1)'}
                fontSize={'14px'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                fontWeight={'normal'}
              >
                Telefonní číslo
              </Th>
            </Tr>
          </Thead>
          <Tbody className='w-full'>
            <Tr className='flex flex-col lg:table-row border-t border-yellow xl:border-none'>
              <Td
                border={'none'}
                className='text-white font-title lg:text-20 text-16'
                padding={{
                  base: '10px 24px 10px 0',
                  lg: '16px 24px 16px 0',
                }}
              >
                {values.customer.first_name} {values.customer.last_name}
              </Td>

              <Td
                border={'none'}
                className='text-white font-title lg:text-20 text-16'
                paddingLeft={{
                  base: '0',
                  lg: '24px',
                }}
                padding={{
                  base: '6px 24px 6px 0',
                  lg: '16px 24px 16px 24px',
                }}
              >
                {values.customer.email}
              </Td>

              <Td
                border={'none'}
                borderBottom={{
                  base: '1px solid rgba(255, 234, 0, 1)',
                  lg: 'none',
                }}
                className='text-white font-title lg:text-20 text-16'
                paddingLeft={{
                  base: '0',
                  lg: '24px',
                }}
                padding={{
                  base: '6px 24px 6px 0',
                  lg: '16px 24px 16px 24px',
                }}
              >
                {values.customer.phone_number}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <div className='flex mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0 py-10 xl:py-0'>
        <p className='font-title text-textGray text-14 mr-30 xl:mr-40 my-20 whitespace-nowrap'>
          Jména na voucher
        </p>
        <div className='flex flex-wrap xl:pl-24 lg:pt-10 xl:gap-60 w-full gap-10'>
          {values.lessonType.map((lesson, index) => {
            const { voucherName, name } = lesson
            return (
              <div
                key={`${lesson.id}-${index}`}
                className='font-title flex lg:flex-col gap-10 lg:gap-0 items-center'
              >
                <span className='lg:text-20 text-16 text-white'>
                  {voucherName}
                </span>
                <span className='text-yellow text-12'>({name})</span>
              </div>
            )
          })}
        </div>
      </div>

      <TableContainer className='mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
        <Table>
          <Thead>
            <Tr>
              <Th
                borderBottom={{
                  base: 'none',
                  lg: '1px solid rgba(255, 234, 0, 1) ',
                }}
                borderTop={{
                  base: '1px solid rgba(255, 234, 0, 1)',
                  lg: 'none',
                }}
                fontSize={'14px'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                paddingLeft={'0'}
                padding={{
                  base: '12px 24px 6px 0',
                  lg: '16px 24px 16px 0',
                }}
                fontWeight={'normal'}
              >
                Lekce
              </Th>
              <Th
                borderBottom={{
                  base: 'none',
                  lg: '1px solid rgba(255, 234, 0, 1) ',
                }}
                borderTop={{
                  base: '1px solid rgba(255, 234, 0, 1)',
                  lg: 'none',
                }}
                fontSize={'14px'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                fontWeight={'normal'}
                padding={{
                  base: '6px 24px 6px 0',
                  lg: '16px 24px 16px 0',
                }}
                className='hidden lg:table-cell'
              >
                Množství
              </Th>
              <Th
                borderBottom={{
                  base: 'none',
                  lg: '1px solid rgba(255, 234, 0, 1) ',
                }}
                borderTop={{
                  base: '1px solid rgba(255, 234, 0, 1)',
                  lg: 'none',
                }}
                fontSize={'14px'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                fontWeight={'normal'}
                padding={{
                  base: '6px 24px 6px 0',
                  lg: '16px 24px 16px 24px',
                }}
              >
                Cena
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(groupedLessons).map((lessonType, index) => {
              const { lesson, count } = lessonType
              return (
                <Tr key={`${lesson.id}-${index}`}>
                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 0',
                    }}
                    className='text-white font-title lg:text-20 text-16'
                    paddingLeft={'0'}
                  >
                    {lesson.name}
                  </Td>

                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16 hidden lg:table-cell'
                  >
                    {count}
                  </Td>
                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16'
                    width={{
                      base: '100px',
                      sm: '150px',
                      md: '200px',
                      xl: '250px',
                    }}
                  >
                    <span className='lg:hidden'>{count} x </span>
                    {formatPrice(lesson.discountedPrice * count)},- CZK
                  </Td>
                </Tr>
              )
            })}
            {Object.values(groupedExtras).map((extraItem, index) => {
              if (!extraItem) return null
              const { name, id, discountedPrice, quantity } = extraItem
              return (
                <Tr key={`${id}-${index}`}>
                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16 ml-auto'
                  >
                    + {name}
                  </Td>
                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16 hidden lg:table-cell'
                  >
                    {quantity}
                  </Td>

                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16'
                  >
                    <span className='lg:hidden'>{quantity} x </span>{' '}
                    {formatPrice(discountedPrice * quantity)},- CZK
                  </Td>
                </Tr>
              )
            })}
            {values.extras &&
              values.extras.length > 0 &&
              values.extras.map((extra, index) => {
                const { name, quantity, discountedPrice, id } = extra
                return (
                  <Tr key={`${id}-${index}`}>
                    <Td
                      border={'none'}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                      className='text-white font-title lg:text-20 text-16 ml-auto'
                    >
                      + {name}
                    </Td>
                    <Td
                      border={'none'}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                      className='text-white font-title lg:text-20 text-16 hidden lg:table-cell'
                    >
                      {quantity}
                    </Td>

                    <Td
                      border={'none'}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                      className='text-white font-title lg:text-20 text-16'
                    >
                      <span className='lg:hidden'>{quantity} x </span>{' '}
                      {formatPrice(discountedPrice * quantity)},- CZK
                    </Td>
                  </Tr>
                )
              })}
            {Object.values(groupedMerch).map((merchItem, index) => {
              if (!merchItem) return null
              const { name, id, discountedPrice, quantity } = merchItem
              return (
                <Tr key={`${id}-${index}`}>
                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16 ml-auto'
                  >
                    + {name}
                  </Td>
                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16 hidden lg:table-cell'
                  >
                    {quantity}
                  </Td>

                  <Td
                    border={'none'}
                    padding={{
                      base: '6px 24px 6px 0',
                      lg: '16px 24px 16px 24px',
                    }}
                    className='text-white font-title lg:text-20 text-16'
                  >
                    <span className='lg:hidden'>{quantity} x </span>{' '}
                    {formatPrice(discountedPrice * quantity)},- CZK
                  </Td>
                </Tr>
              )
            })}
            {values.merch &&
              values.merch.length > 0 &&
              values.merch.map((merch, index) => {
                const { name, quantity, discountedPrice, size, id } = merch
                return (
                  <Tr key={`${id}-${index}`}>
                    <Td
                      border={'none'}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                      className='text-white font-title lg:text-20 text-16'
                    >
                      + {name} {size && `(velikost: ${size})`}
                    </Td>
                    <Td
                      border={'none'}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                      className='text-white font-title lg:text-20 text-16 hidden lg:table-cell'
                    >
                      {quantity}
                    </Td>

                    <Td
                      border={'none'}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                      className='text-white font-title lg:text-20 text-16'
                    >
                      <span className='lg:hidden'>{quantity} x </span>{' '}
                      {formatPrice(discountedPrice * quantity)},- CZK
                    </Td>
                  </Tr>
                )
              })}
            {values.discountCodeId && (
              <Tr>
                <Td
                  borderBottom={'none'}
                  padding={{
                    base: '6px 24px 6px 0',
                    lg: '16px 24px 16px 0px',
                  }}
                  className='text-yellow font-title lg:text-20 text-16'
                >
                  <span>Slevový kód</span>
                  <span className='text-white pl-40 xl:pl-100'>
                    {values.discountInfo?.code}
                  </span>
                  <span className='lg:hidden pl-20'>
                    {values.discountInfo?.type === 'price' &&
                      `-${values.discountInfo?.discount.toFixed(0)}%`}
                    {values.discountInfo?.type === 'min' &&
                      `+ ${values.discountInfo?.discount} min`}
                  </span>
                </Td>

                <Td
                  className='text-yellow font-title lg:text-20 text-16 hidden lg:table-cell'
                  borderBottom={'none'}
                >
                  <span>
                    {values.discountInfo?.type === 'price' &&
                      `-${values.discountInfo?.discount.toFixed(0)}%`}
                    {values.discountInfo?.type === 'min' &&
                      `+ ${values.discountInfo?.discount} min`}
                  </span>
                </Td>

                <Td
                  border={'none'}
                  padding={{
                    base: '6px 24px 6px 0',
                    lg: '16px 24px 16px 24px',
                  }}
                  className='text-yellow font-title lg:text-20 text-16'
                >
                  {discountValue},- CZK
                </Td>
              </Tr>
            )}
            <Tr>
              <Td
                borderBottom={'0'}
                borderTop={'1px solid rgba(255, 234, 0, 1)'}
                className='text-textGray font-title text-20'
                padding={{
                  base: '12px 24px 6px 0',
                  lg: '16px 24px 16px 0px',
                }}
                fontSize={'14px'}
              >
                Celkem
              </Td>
              <Td
                borderTop={'1px solid rgba(255, 234, 0, 1)'}
                borderBottom={'0'}
                className='hidden lg:table-cell'
              ></Td>

              <Td
                borderBottom={'0'}
                borderTop={'1px solid rgba(255, 234, 0, 1)'}
                className='text-white font-title lg:text-20 text-16'
                padding={{
                  base: '10px 24px 6px 0',
                  lg: '16px 24px 16px 24px',
                }}
              >
                {totalDiscountedPrice},- CZK
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <p className='text-darkerGray font-title my-34 xl:my-10 text-right ml-auto text-12 mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
        Stisknutím tlačítka “Dokončit a zaplatit” souhlasíte se zpracováním
        osobních údajů a s obecnými podmínkami užití
      </p>
    </Layout>
  )
}
