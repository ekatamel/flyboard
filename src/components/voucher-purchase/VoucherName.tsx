import { Layout } from 'components/shared/Layout'
import { Basket } from '../voucher-purchase-form/Basket'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react'
import { useFormikContext, Field, FormikErrors } from 'formik'
import { LessonType, Order } from 'types/types'
import { format } from 'date-fns'
import spy from 'assets/images/spy.png'
import heart from 'assets/images/heart.png'
import moustache from 'assets/images/moustache.png'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Button } from 'components/shared/Button'
import voucherSreenshot from 'assets/images/voucher-screen.png'
import { useContext, useEffect } from 'react'
import { FormNavigationContext } from 'context/VoucherFormNavigationContext'
import { Voucher } from 'components/voucher/Voucher'
import { useMediaQuery } from '@chakra-ui/react'
import { InputError } from 'components/shared/InputError'
import { InfoOverlay } from 'components/shared/InfoOverlay'

export const VoucherName = () => {
  const { values, errors, touched } = useFormikContext<Order>()

  const { setIsNextStepDisabled } = useContext(FormNavigationContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isXlBreakpoint] = useMediaQuery('(min-width: 1280px)')

  useEffect(() => {
    const isVoucherNamePresent = values.lessonType.every(lessonType => {
      return lessonType.voucherName !== ''
    })

    !isVoucherNamePresent || errors.lessonType
      ? setIsNextStepDisabled(true)
      : setIsNextStepDisabled(false)
  }, [setIsNextStepDisabled, values.lessonType, errors.lessonType])

  return (
    <Layout
      stepName='Voucher'
      title='Jméno na voucher'
      rightPart={<Basket />}
      bottomCenterPart={
        <div className='w-full ml-auto flex md:w-fit xl:block my-40 sm:my-0 md:basis-8/12'>
          <Button
            title='Náhled na voucher'
            position='center'
            variant='primary'
            onClick={onOpen}
            isRounded={false}
          />
        </div>
      }
    >
      <div className='w-fit mx-auto flex gap-30 px-20 xl:px-0 mt-20 text-14 xl:text-16'>
        <p className='text-white flex items-center gap-10 pb-8'>
          <img src={heart} alt='Clock icon' className='w-24' />
          <span>Miláček?</span>
        </p>
        <p className='text-white flex items-center gap-10 pb-8'>
          <img src={moustache} alt='Location icon' className='w-30' />
          <span>Pro tatínka?</span>
        </p>
        <p className='text-white flex items-center gap-10 pb-8'>
          <img src={spy} alt='Foot icon' className='w-24' />
          <span>Petr Novák?</span>
        </p>
      </div>
      <p className='text-center text-white px-44 xl:px-0 text-12 xl:text-16 mt-10'>
        Uveď přesné jméno, které se má objevit na voucheru.
      </p>
      <TableContainer className='mx-20 sm:mx-44 md:mx-80 xl:mx-0 mt-20 xl:mt-40 lg:px-0 invisible-scrollbar'>
        <Table>
          <Thead>
            <Tr>
              <Th
                border={'none'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                fontSize={{
                  base: '12px',
                  lg: '16px',
                }}
                className='flex items-center gap-4'
                padding={{
                  base: '8px 0',
                  lg: '16px 0',
                }}
                fontWeight={'normal'}
              >
                Lekce
                <InfoOverlay
                  label={
                    <p className='font-body text-12 lg:text-14 normal-case tracking-normal'>
                      Přejete si nakoupit více voucherů? Vyberte si lekce v
                      předhozím kroku.
                    </p>
                  }
                />
              </Th>
              <Th
                border={'none'}
                fontSize={{
                  base: '12px',
                  lg: '16px',
                }}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                padding={{
                  base: '8px 10px',
                  lg: '16px 24px',
                }}
                fontWeight={'normal'}
              >
                Platnost do
              </Th>
              <Th
                border={'none'}
                color={'rgba(255, 255, 255, 0.7)'}
                fontFamily={'Bebas Neue'}
                fontSize={{
                  base: '12px',
                  lg: '16px',
                }}
                className='flex items-center gap-4'
                padding={{
                  base: '8px 10px',
                  lg: '16px 24px',
                }}
                fontWeight={'normal'}
              >
                Jméno{' '}
                <InfoOverlay
                  label={
                    <p className='font-body text-12 lg:text-14 normal-case tracking-normal'>
                      Jméno se zobrazí na dárkovém voucheru
                    </p>
                  }
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody className='text-white font-title'>
            {values.lessonType.map((lesson, index) => {
              return (
                <Tr key={index}>
                  <Td
                    isTruncated
                    border={'none'}
                    className='xl:text-heading text-14 overflow-hidden'
                    padding={{
                      base: '12px 0px',
                      lg: '20px 0',
                    }}
                    maxWidth={{
                      base: '130px',
                      lg: 'fit-content',
                    }}
                  >
                    {lesson.name}
                  </Td>
                  <Td
                    border={'none'}
                    className='xl:text-heading text-14'
                    padding={{
                      base: '12px 10px',
                      lg: '20px 24px',
                    }}
                  >
                    <div className='flex items-center'>
                      {format(new Date(lesson.validTill), 'dd.MM.yyyy')}
                    </div>
                  </Td>
                  <Td
                    border={'none'}
                    padding={{
                      base: '12px 4px 14px 4px',
                      lg: '20px 0px 20px 24px',
                    }}
                  >
                    <div className='relative'>
                      <Field
                        className='w-full h-34 lg:h-44 px-8 max-w-169 border bg-black font-body focus:outline-none focus:border-yellow text-white block border-white rounded text-16'
                        name={`lessonType[${index}].voucherName`}
                        placeholder='Petr Novák'
                      />
                      {(errors.lessonType as FormikErrors<LessonType>[])?.[
                        index
                      ] &&
                        touched.lessonType?.[index]?.voucherName && (
                          <InputError
                            errorText={
                              (
                                errors.lessonType as FormikErrors<LessonType>[]
                              )?.[index]?.voucherName || ''
                            }
                          />
                        )}
                    </div>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{
          base: 'full',
          xl: 'full',
        }}
      >
        <ModalOverlay sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
        <ModalContent className='lg:w-[65vw]'>
          <ModalCloseButton color={'white'} />
          <ModalBody
            className='flex justify-center items-center'
            padding={{
              base: '60px 5px',
              lg: '30px 5px',
            }}
          >
            {isXlBreakpoint ? (
              <div className='border border-yellow xl:mt-40 h-fit'>
                <Voucher />
              </div>
            ) : (
              <div className='w-595'>
                <img
                  src={voucherSreenshot}
                  alt='Voucher example'
                  className='object-contain'
                />
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <div className='mb-40 m-auto lg:mr-40'>
              <Button
                title='Zavřít'
                variant='primary'
                position='right'
                onClick={onClose}
              />
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  )
}
