import { Layout } from 'components/shared/Layout'
import { TextInput } from 'components/shared/TextInput'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../shared/Button'
import { useMutation } from 'react-query'
import { validateVoucher } from 'utils/requests'
import { Toast } from 'components/shared/Toast'
import { useToast } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { Response, Vouchers } from 'types/types'
import { getToastMessage } from 'utils/utils'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
  Thead,
} from '@chakra-ui/react'
import cross from 'assets/images/cross.svg'
import { FormNavigationContext } from 'context/ReservationFormNavigationContext'

export const VoucherCodes = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [value, setValue] = useState('')

  const { setFieldValue, values } = useFormikContext<Vouchers>()
  const { setIsNextStepDisabled } = useContext(FormNavigationContext)

  const { mutate: validate } = useMutation(validateVoucher, {
    onSuccess: data => {
      const voucherApplied = values.vouchers?.find(
        voucher => voucher.voucher_code === data.voucher?.voucher_code,
      )

      const status = data.code === 200 && !voucherApplied ? 'success' : 'error'

      if (status === 'success') {
        setFieldValue('vouchers', [
          ...(values.vouchers ?? []),
          { ...data.voucher, code: data.voucher.voucher_code },
        ])
        setValue('')
      }

      const toastMessage = getToastMessage(status, !!voucherApplied, data)

      toast({
        position: 'top',
        status,
        duration: status === 'success' ? 4000 : 10000,
        isClosable: true,
        render: () => (
          <Toast
            status={status}
            title={toastMessage.title}
            description={toastMessage.description}
          />
        ),
      })
    },
    onError: (data: Response) => {
      toast({
        position: 'top',
        status: 'error',
        duration: 10000,
        isClosable: true,
        render: () => (
          <Toast
            status={'error'}
            title={
              data.message_headline ||
              'Něco se pokazilo. Kontaktujte nás prosím.'
            }
          />
        ),
      })
    },
  })

  useEffect(() => {
    !values.vouchers || values.vouchers.length === 0
      ? setIsNextStepDisabled(true)
      : setIsNextStepDisabled(false)
  }, [values.vouchers])

  return (
    <Layout
      stepName='Voucher'
      title='Kód voucheru'
      onPreviosStepClick={() => navigate('/')}
    >
      <p className='text-white mt-20 xl:mt-10 lg:mt-38 text-14 lg:text-16 text-center px-20 sm:px-44 md:px-80 lg:px-100 xl:px-0'>
        Zadejte svůj kód, který naleznete na vytištěném voucheru nebo v emailu a
        stiskněte "Ověřit". Ujistětě, že je kód správný a připravte se na
        vzrušující zážitek nad vodní hladinou.
      </p>

      <div className='flex gap-20 lg:gap-100 mt-40 lg:mt-100 justify-center items-center px-20 sm:px-44 md:px-80 xl:px-0 flex-wrap sm:flex-nowrap mb-20'>
        <TextInput
          className='w-full h-44 text-14'
          value={value}
          setValue={setValue}
          placeholder={'Kód voucheru'}
        />
        <Button
          title='Ověřit'
          type='submit'
          variant='primary'
          disabled={!value}
          onClick={() => validate(value)}
          isRounded={false}
          className='lg:w-200'
        />
      </div>

      {values.vouchers && values.vouchers.length > 0 && (
        <TableContainer
          overflowY={'auto'}
          className='px-20 sm:px-44 md:px-80 xl:px-0 md:mt-40'
        >
          <Table className='lg:table'>
            <Thead>
              <Tr className='lg:table-row border-none'>
                <Th
                  padding={{
                    base: '12px 12px 12px 0',
                    lg: '16px 24px 16px 0',
                  }}
                  paddingLeft={'0'}
                  borderTop={'none'}
                  borderBottom={'1px solid rgba(255, 234, 0, 1)'}
                  fontSize={{
                    base: '12px',
                    lg: '14px',
                  }}
                  color={'rgba(255, 255, 255, 0.7)'}
                  fontFamily={'Bebas Neue'}
                  fontWeight={'normal'}
                >
                  Kód voucheru
                </Th>
                <Th
                  padding={{
                    base: '8px 12px 8px 0',
                    lg: '16px 24px 16px 24px',
                  }}
                  borderBottom={'1px solid rgba(255, 234, 0, 1)'}
                  fontSize={{
                    base: '12px',
                    lg: '14px',
                  }}
                  color={'rgba(255, 255, 255, 0.7)'}
                  fontFamily={'Bebas Neue'}
                  fontWeight={'normal'}
                >
                  Typ lekce
                </Th>
                <Th
                  padding={{
                    base: '8px 12px 8px 0',
                    lg: '16px 24px 16px 24px',
                  }}
                  borderBottom={'1px solid rgba(255, 234, 0, 1)'}
                  fontSize={{
                    base: '12px',
                    lg: '14px',
                  }}
                  color={'rgba(255, 255, 255, 0.7)'}
                  fontFamily={'Bebas Neue'}
                  fontWeight={'normal'}
                >
                  Doba trvání
                </Th>
                <Th
                  padding={{
                    base: '8px 24px 8px 0',
                    lg: '16px 24px 16px 24px',
                  }}
                  borderBottom={'1px solid rgba(255, 234, 0, 1)'}
                  fontSize={{
                    base: '12px',
                    lg: '14px',
                  }}
                  color={'rgba(255, 255, 255, 0.7)'}
                  fontFamily={'Bebas Neue'}
                  fontWeight={'normal'}
                >
                  Portál
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {values.vouchers.map(voucher => {
                const { voucher_code, length, lesson_name, merchant } = voucher
                return (
                  <Tr key={voucher_code} className='lg:table-row'>
                    <Td
                      border={'none'}
                      className='text-white font-title lg:text-20 text-14'
                      padding={{
                        base: '10px 24px 10px 0',
                        lg: '16px 24px 16px 0',
                      }}
                    >
                      {voucher_code}
                    </Td>

                    <Td
                      border={'none'}
                      className='text-white font-title lg:text-20 text-14'
                      paddingLeft={{
                        base: '0',
                        lg: '24px',
                      }}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                    >
                      {lesson_name}
                    </Td>

                    <Td
                      border={'none'}
                      className='text-white font-title lg:text-20 text-14'
                      paddingLeft={{
                        base: '0',
                        lg: '24px',
                      }}
                      padding={{
                        base: '6px 24px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                    >
                      {length} min
                    </Td>
                    <Td
                      border={'none'}
                      className='text-white font-title lg:text-20 text-14 flex justify-between'
                      paddingLeft={{
                        base: '0',
                        lg: '24px',
                      }}
                      padding={{
                        base: '10px 0px 6px 0',
                        lg: '16px 24px 16px 24px',
                      }}
                    >
                      {merchant}
                      <img
                        src={cross}
                        alt='Cross icon'
                        className='cursor-pointer w-12 lg:w-16'
                        onClick={() => {
                          setFieldValue(
                            'vouchers',
                            values.vouchers?.filter(
                              voucher => voucher.voucher_code !== voucher_code,
                            ),
                          )
                        }}
                      />
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  )
}
