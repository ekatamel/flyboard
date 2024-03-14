import { Form, Formik } from 'formik'
import { useContext } from 'react'
import {
  FormNavigationContext,
  FormNavigationProvider,
} from 'context/ReservationFormNavigationContext'
import { AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

import { object, string, number, array } from 'yup'

const initialValues = {}

const ReservationSchema = object().shape({
  date: string().required(),
  branch_id: number().required(),
  slots_required: number().required(),
  vouchers: array()
    .of(
      object().shape({
        voucher_code: string().required(),
        customer: object().shape({
          first_name: string().required('Povinné pole'),
          last_name: string().required('Povinné pole'),
          email: string()
            .email('Nevalidní email')
            .when('contact_person', {
              is: 1,
              then: schema => schema.required('Povinné pole'),
            }),

          phone_number: string()
            .matches(/^\+?[0-9]+$/, 'Nevalidní telefonní číslo')
            .when('contact_person', {
              is: 1,
              then: schema => schema.required('Povinné pole'),
            }),
          contact_person: number().oneOf([0, 1]),
        }),
      }),
    )
    .test(
      'contact-person-check',
      'Vyber jednu kontaktní osobu pro rezervaci',
      vouchers =>
        vouchers?.some(voucher => voucher.customer.contact_person === 1),
    ),
})

export const LessonReservationForm = () => {
  return (
    <FormNavigationProvider>
      <Formik
        initialValues={initialValues}
        validationSchema={ReservationSchema}
        onSubmit={values => {}}
      >
        {() => {
          return <LessonReservation />
        }}
      </Formik>
    </FormNavigationProvider>
  )
}

export const LessonReservation = () => {
  const { currentStepIndex, formSteps } = useContext(FormNavigationContext)

  return (
    <Form>
      <AnimatePresence>
        <div className={clsx(currentStepIndex === 7 ? 'bg-white' : 'bg-black')}>
          {formSteps[currentStepIndex]}
        </div>
      </AnimatePresence>
    </Form>
  )
}
