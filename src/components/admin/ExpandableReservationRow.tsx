import { AdminButton } from 'components/shared/AdminButton'
import { Branch, Reservation, ReservationState } from 'types/types'
import { useQuery, useQueryClient } from 'react-query'
import { useToast } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'

interface ExpandableReservationRowProps {
  reservation: Reservation
  toggleExpanded: () => void
}

export const ExpandableReservationRow = ({
  reservation,
  toggleExpanded,
}: ExpandableReservationRowProps) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { used_by, order_extras, order_merch, message, status } = reservation

  // TODO pridat update rezervace
  const updateVoucherData = async () => {}

  const initialValues = {
    first_name: used_by?.first_name,
    last_name: used_by?.last_name,
    email: used_by?.email,
    phone_number: used_by?.phone_number,
    instagram: used_by?.instagram ?? '',
    message: message ?? '',
    status,
  }

  return (
    <Formik initialValues={initialValues} onSubmit={values => {}}>
      {({ values, resetForm }) => {
        return (
          <Form>
            <div className='flex flex-col gap-30 pt-22 px-10 pb-10'>
              <div className='flex'>
                <p className='font-title text-yellow w-120'>Zákazník</p>
                <div className='flex gap-30'>
                  <div className='flex flex-col gap-4'>
                    <label className='font-title text-yellow my-auto text-16 whitespace-nowrap'>
                      Jméno
                    </label>
                    <Field
                      type='text'
                      name='first_name'
                      className='w-full h-44 px-10 max-w-169 border bg-darkGray focus:outline-none focus:border-white text-white block border-yellow rounded text-16 font-title'
                    />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <label className='font-title text-yellow my-auto text-16 whitespace-nowrap'>
                      Příjmení
                    </label>
                    <Field
                      type='text'
                      name='last_name'
                      className='w-full h-44 px-10 max-w-169 border bg-darkGray focus:outline-none focus:border-white text-white block border-yellow rounded text-16 font-title'
                    />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <label className='font-title text-yellow my-auto text-16 whitespace-nowrap'>
                      Telefon
                    </label>
                    <Field
                      type='text'
                      name='phone_number'
                      className='w-full h-44 px-10 max-w-169 border bg-darkGray focus:outline-none focus:border-white text-white block border-yellow rounded text-16 font-title'
                    />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <label className='font-title text-yellow my-auto text-16 whitespace-nowrap'>
                      Email
                    </label>
                    <Field
                      type='email'
                      name='email'
                      className='w-full h-44 px-10 max-w-169 border bg-darkGray focus:outline-none focus:border-white text-white block border-yellow rounded text-16 font-title'
                    />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <label className='font-title text-yellow my-auto text-16 whitespace-nowrap'>
                      Instagram
                    </label>
                    <Field
                      type='text'
                      name='instagram'
                      className='w-full h-44 px-10 max-w-169 border bg-darkGray focus:outline-none focus:border-white text-white block border-yellow rounded text-16 font-title'
                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-30'>
                <div className='flex'>
                  <p className='font-title text-yellow text-16 w-120 shrink-0'>
                    Video
                  </p>
                  {order_extras && (
                    <p>
                      {order_extras.map(extra => extra.extras_name).join(', ')}
                    </p>
                  )}
                </div>
                <div className='flex flex-col gap-4'>
                  <label className='font-title text-yellow my-auto text-16 whitespace-nowrap'>
                    Stav
                  </label>
                  <Field
                    as='select'
                    name='status'
                    value={ReservationState[values.status]}
                    className='w-full h-44 px-10 max-w-169 border bg-darkGray focus:outline-none focus:border-white text-white block border-yellow rounded text-16 font-title'
                  >
                    <option value='' disabled>
                      Vyber stav
                    </option>
                    {Object.values(ReservationState).map(state => {
                      return (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      )
                    })}
                  </Field>
                </div>
              </div>
              <div className='flex'>
                <p className='font-title text-yellow text-16 w-120 shrink-0'>
                  Merch
                </p>
                {order_merch && (
                  <p>{order_merch.map(extra => extra.merch_name).join(', ')}</p>
                )}
              </div>
              <div className='flex'>
                <p className='font-title text-yellow text-16 w-120 shrink-0'>
                  Poznámka
                </p>
                <Field
                  as='textarea'
                  type='text'
                  name='message'
                  className='w-1/2 min-h-100 px-10 max-w-169 border bg-darkGray focus:outline-none focus:border-white text-white block border-yellow rounded text-16 font-title'
                />
              </div>

              <div className='flex gap-20 justify-end'>
                <AdminButton
                  title='Zrušit'
                  className='bg-black border-yellow text-yellow'
                  onClick={() => {
                    resetForm()
                    toggleExpanded()
                  }}
                />
                <AdminButton
                  title='Uložit'
                  className='bg-yellow border-yellow text-black'
                  onClick={() => {
                    updateVoucherData()
                    toggleExpanded()
                  }}
                />
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
