import { Layout } from 'components/shared/Layout'
import { Field, FormikErrors, FormikTouched } from 'formik'
import { getReservationContactFormFields } from 'utils/utils'
import { useFormikContext } from 'formik'
import { Voucher, Vouchers } from 'types/types'
import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { DateTimeInfo } from './DateTimeInfo'
import { FormNavigationContext } from 'context/ReservationFormNavigationContext'
import { SimpleCarousel } from 'components/shared/SimpleCarousel'
import { useMediaQuery } from '@chakra-ui/react'
import { InputError } from 'components/shared/InputError'

export const ReservationContacts = () => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<Vouchers>()

  const { setIsNextStepDisabled } = useContext(FormNavigationContext)
  const [isMdBreakpoint] = useMediaQuery('(min-width: 768px)')

  const [contactIndex, setContactIndex] = useState(0)

  const contactFormFields = getReservationContactFormFields()
  const voucher = values.vouchers[contactIndex]

  const contactPersonVoucherIndex = values.vouchers.findIndex(
    voucher => voucher.customer?.contact_person === 1,
  )

  useEffect(() => {
    contactPersonVoucherIndex === -1 &&
      setFieldValue('vouchers[0].customer.contact_person', 1)
  }, [])

  useEffect(() => {
    const contactPerson: Voucher | undefined = values.vouchers.find(
      voucher => voucher.customer?.contact_person === 1,
    )
    const contactCustomer = contactPerson?.customer

    const isFormReadyToSubmit =
      Object.keys(errors).length === 0 &&
      !!contactPerson &&
      !!contactCustomer?.email &&
      !!contactCustomer?.phone_number

    isFormReadyToSubmit
      ? setIsNextStepDisabled(false)
      : setIsNextStepDisabled(true)
  }, [errors, values, setIsNextStepDisabled])

  const error = errors.vouchers?.[contactIndex] as FormikErrors<Voucher>
  const touchedInput = touched.vouchers?.[
    contactIndex
  ] as FormikTouched<Voucher>

  return (
    <Layout
      stepName='Letci'
      title='S kým se potkáme?'
      bottomCenterPart={isMdBreakpoint && <DateTimeInfo />}
    >
      <p className='text-white mt-20 xl:mt-10 lg:mt-38 text-14 lg:text-16 text-center px-20 sm:px-44 md:px-80 lg:px-100 xl:px-0 mb-40'>
        Prosím, sdělte nám, koho potkáme a přidejte email a telefon pro případné
        technické problémy nebo změny rezervace. Alespoň jedna osoba musí být
        označená jako kontaktní. Zmiňte také váš Instagram a zúčastněte se
        slosování o LET ZDARMA!
      </p>
      <SimpleCarousel
        item={
          <div className='flex'>
            <p className='font-title text-20 text-white mr-8'>
              {voucher.lesson_name}
            </p>
            <p className='font-title text-20 text-yellow'>
              {voucher.voucher_code}
            </p>
          </div>
        }
        itemsNumber={values.vouchers.length}
        index={contactIndex}
        setIndex={setContactIndex}
        className='left-[45%] -top-[90%]'
      />

      <div className='flex flex-wrap flex-col lg:flex-row gap-10 lg:gap-30 xl:gap-10 justify-between mx-20 sm:mx-44 md:mx-80 xl:mx-0 mb-10 lg:mb-0'>
        {contactFormFields.map(field => {
          const { type, required, label, placeholder, name } = field
          const isCheckbox = type === 'checkbox'
          const isRequired =
            required ||
            ((name === 'email' || name === 'phone_number') &&
              values.vouchers[contactIndex].customer?.contact_person === 1)
          return (
            <div
              key={`${name}-${contactIndex}`}
              className={'lg:h-89 h-64 w-full lg:w-5/12'}
            >
              <div
                className={clsx(
                  'flex',
                  isCheckbox
                    ? 'flex-row-reverse gap-20 justify-center lg:justify-end items-center mt-10 lg:mt-36'
                    : 'lg:block',
                )}
              >
                <label className='font-title text-textGray lg:text-white w-150 my-auto text-16 whitespace-nowrap'>
                  {label} {isRequired && '*'}
                </label>
                {type === 'text' && (
                  <Field
                    type='text'
                    className='w-full h-44 px-10 max-w-169 border bg-black font-body focus:outline-none focus:border-yellow text-white block border-white rounded text-16'
                    name={`vouchers[${contactIndex}].customer.${name}`}
                    placeholder={placeholder}
                  />
                )}

                {isCheckbox && (
                  <Field
                    checked={
                      values.vouchers[contactIndex].customer?.contact_person ===
                      1
                    }
                    type='checkbox'
                    className='w-24 h-24 accent-yellow'
                    name={`vouchers[${contactIndex}].customer.${name}`}
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const isChecked = e.target.checked

                      setFieldValue(
                        `vouchers[${contactIndex}].customer.${name}`,
                        isChecked ? 1 : 0,
                      )

                      if (isChecked) {
                        values.vouchers.forEach((_, idx) => {
                          if (idx !== contactIndex) {
                            setFieldValue(
                              `vouchers[${idx}].customer.${name}`,
                              0,
                            )
                          }
                        })
                      }
                    }}
                  />
                )}
              </div>
              {type === 'checkbox' &&
                values.vouchers.every(
                  voucher => !voucher?.customer?.contact_person,
                ) && (
                  <InputError
                    errorText={'Vyber jednu kontaktní osobu pro rezervaci'}
                    className={'text-center lg:text-left ml-45'}
                  />
                )}

              {error?.customer?.[name] && touchedInput?.customer?.[name] && (
                <InputError errorText={error.customer?.[name] || ''} />
              )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
