import { Layout } from 'components/shared/Layout'
import { useFormikContext } from 'formik'
import { Vouchers, Response } from 'types/types'
import { format } from 'date-fns'
import { useContext, useState } from 'react'
import { SimpleCarousel } from 'components/shared/SimpleCarousel'
import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { createReservation } from 'utils/requests'
import { FormNavigationContext } from 'context/ReservationFormNavigationContext'
import { Toast } from 'components/shared/Toast'

export const ReservationSummary = () => {
  const toast = useToast()
  const { values } = useFormikContext<Vouchers>()
  const { goToNextStep } = useContext(FormNavigationContext)
  const { date, time, branch_name } = values

  const [contactIndex, setContactIndex] = useState(0)

  const { mutate: postNewReservation } = useMutation(createReservation, {
    onSuccess: () => {
      goToNextStep()
    },
    onError: (data: Response) => {
      toast({
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast
            status={'error'}
            title={data.message ?? 'Něco se pokazilo. Kontaktujte nás prosím.'}
          />
        ),
      })
    },
  })

  const createNewReservation = () => {
    const vouchersInfo = {
      date: values.date,
      branch_id: values.branch_id,
      time: values.time,
      slots_required: values.slots_required,
      timeslot_id: values.timeslot_id,
      vouchers: values.vouchers.map(voucher => ({
        code: voucher.voucher_code,
        customer: {
          ...voucher.customer,
          gdpr: true,
          contact_person: voucher.customer.contact_person ?? 0,
        },
      })),
    }

    return postNewReservation(vouchersInfo)
  }

  return (
    <Layout
      stepName='Shrnutí'
      title='Rekapitulace'
      onNextStepClick={createNewReservation}
    >
      <p className='text-white mt-20 xl:mt-10 lg:mt-38 text-14 lg:text-16 text-center px-20 sm:px-44 md:px-80 lg:px-100 xl:px-0 mb-40'>
        Na lekci doražte 10 minut před zvoleným časem. Během jedné hodiny již
        budete stát nad vodou. Podrobnější informace k lekci i lokalitě
        očekávejte 2 dny předem.
      </p>
      <div className='flex flex-col items-center gap-10 lg:px-80 xl:px-0'>
        <div className='lg:border-b border-b-darkYellow w-full'>
          <p className='font-title text-16 lg:text-22 text-darkerGray text-center'>
            Kdy?
          </p>
          <p className='font-title text-18 lg:text-22 text-white text-center mb-10 lg:mb-0'>
            {format(new Date(date), 'dd.MM.yyyy')} {time}
          </p>
        </div>
        <div className='lg:border-b border-b-darkYellow w-full'>
          <p className='font-title text-16 lg:text-22 text-darkerGray text-center'>
            Kde?
          </p>
          <p className='font-title text-18 lg:text-22 text-white text-center mb-10 lg:mb-0'>
            {branch_name}
          </p>
        </div>
        <div className='w-full'>
          <p className='font-title text-16 lg:text-22 text-darkerGray text-center lg:mb-40 xl:mb-0'>
            Kdo?
          </p>
          <SimpleCarousel
            index={contactIndex}
            setIndex={setContactIndex}
            itemsNumber={values.vouchers.length}
            item={<VoucherSummary contactIndex={contactIndex} />}
            className='left-[45%] -top-8 lg:-top-[24px]'
          />
        </div>
      </div>
      <p className='text-darkerGray font-title my-34 xl:my-10 text-right ml-auto text-12 mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
        Stisknutím tlačítka “Dokončit” souhlasíte se zpracováním osobních údajů
        a s obecnými podmínkami užití
      </p>
    </Layout>
  )
}

const VoucherSummary = ({ contactIndex }: { contactIndex: number }) => {
  const { values } = useFormikContext<Vouchers>()

  const { first_name, last_name, email, phone_number, instagram } =
    values.vouchers[contactIndex].customer

  return (
    <div className='w-full flex justify-center mt-20 lg:mt-0'>
      <div>
        <div className='flex items-center'>
          <p className='text-textGray font-title text-14 w-100'>
            Jmeno a příjmení:
          </p>
          <p className='text-white font-title text-18 lg:text-22'>
            {first_name} {last_name}
          </p>
        </div>
        {email && (
          <div className='flex items-center'>
            <p className='text-textGray font-title text-14 w-100'>Email:</p>
            <p className='text-white font-title text-18 lg:text-22'>{email}</p>
          </div>
        )}
        {phone_number && (
          <div className='flex items-center'>
            <p className='text-textGray font-title text-14 w-100'>Telefon:</p>
            <p className='text-white font-title text-18 lg:text-22'>
              {phone_number}
            </p>
          </div>
        )}
        {instagram && (
          <div className='flex items-center'>
            <p className='text-textGray font-title text-14 w-100'>Instagram:</p>
            <p className='text-white font-title lg:text-22'>{instagram}</p>
          </div>
        )}
        <div className='flex items-center'>
          <p className='text-textGray font-title text-14 w-100'>Lekce:</p>
          <p className='text-white font-title text-18 lg:text-22'>
            {values.vouchers[contactIndex].lesson_name}
          </p>
        </div>
        <div className='flex items-center'>
          <p className='text-textGray font-title text-14 w-100'>
            Kód voucheru:
          </p>
          <p className='text-white font-title text-18  lg:text-22'>
            {values.vouchers[contactIndex].voucher_code}
          </p>
        </div>
      </div>
    </div>
  )
}
