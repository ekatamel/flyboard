import { Form } from 'formik'
import { useContext } from 'react'
import {
  FormNavigationContext,
  FormNavigationProvider,
} from 'context/VoucherFormNavigationContext'
import { AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Formik } from 'formik'

import * as Yup from 'yup'

const initialValues = {
  hasVoucher: false,
  lessonType: [],
  customer: {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  },
}

const OrderSchema = Yup.object().shape({
  customer: Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .min(2, 'Příliš krátké!')
      .max(50, 'Příliš dlouhé!')
      .required('Povinné pole'),
    last_name: Yup.string()
      .trim()
      .min(2, 'Příliš krátké!')
      .max(50, 'Příliš dlouhé!')
      .required('Povinné pole'),
    email: Yup.string().email('Nevalidní email').required('Povinné pole'),
    phone_number: Yup.string()
      .required('Povinné pole')
      .matches(/^\+?[0-9]+$/, 'Nevalidní telefonní číslo'),
    know_from: Yup.string()
      .trim()
      .min(2, 'Příliš krátké!')
      .required('Povinné pole'),
  }),
  lessonType: Yup.array().of(
    Yup.object().shape({
      voucherName: Yup.string()
        .required('Povinné pole')
        .trim()
        .min(2, 'Příliš krátké!')
        .max(50, 'Příliš dlouhé!'),
    }),
  ),
})

export const VoucherPurchaseForm = () => {
  return (
    <FormNavigationProvider>
      <Formik
        initialValues={initialValues}
        validationSchema={OrderSchema}
        onSubmit={values => {}}
      >
        {() => {
          return <VoucherPurchase />
        }}
      </Formik>
    </FormNavigationProvider>
  )
}

export const VoucherPurchase = () => {
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
