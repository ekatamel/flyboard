import { Layout } from 'components/shared/Layout'
import { Basket } from '../voucher-purchase-form/Basket'
import { useFormikContext, Field } from 'formik'
import { KnowFrom, Order } from 'types/types'
import { useContext, useEffect, useState } from 'react'
import { FormNavigationContext } from 'context/VoucherFormNavigationContext'
import { useQuery } from 'react-query'
import { fetchKnowFrom } from 'utils/requests'
import { getContactFormFields } from 'utils/utils'
import { InputError } from 'components/shared/InputError'

export const Contact = () => {
  const { values, setValues, errors, touched } = useFormikContext<Order>()
  const { setIsNextStepDisabled } = useContext(FormNavigationContext)

  const { data: knowFromSources } = useQuery<KnowFrom[]>(
    'knowFrom',
    fetchKnowFrom,
  )

  const [otherKnowFrom, setOtherKnowFrom] = useState(false)

  const handleValueChange = (name: string, value: string) =>
    setValues(() => ({
      ...values,
      customer: {
        ...values.customer,
        [name]: value,
      },
    }))

  useEffect(() => {
    const isNextStepEnabled = Object.keys(errors).length === 0

    isNextStepEnabled
      ? setIsNextStepDisabled(false)
      : setIsNextStepDisabled(true)
  }, [errors, setIsNextStepDisabled])

  const contactFormFields = getContactFormFields(otherKnowFrom)

  return (
    <Layout stepName='Kontakt' title='Kontaktní údaje' rightPart={<Basket />}>
      <p className='text-white text-14 lg:text-16 mt-20 text-center m-auto  mb-40 flex flex-col mx-20 sm:mx-44 lg:mx-0'>
        <span>Dost o obdarovávaném... Kdo nám to tu nakupuje?</span>
        <span>
          Zkontroluj si správně vyplněný email. Právě tam Ti dárkový voucher
          přijde :).
        </span>
      </p>
      <div className='flex flex-wrap flex-col lg:flex-row gap-10 lg:gap-30 justify-between mx-20 sm:mx-44 md:mx-80 xl:mx-0 mb-40 lg:mb-0'>
        {contactFormFields.map((field, index) => {
          if (!field.included) return null
          return (
            <div
              key={`${field.name}-${index}`}
              className='lg:h-89 h-64 w-full lg:w-5/12'
            >
              <div className='flex lg:block'>
                <label className='font-title text-textGray lg:text-white w-150 my-auto text-14 lg:text-16'>
                  {field.label} {field.required && '*'}
                </label>
                {field.type === 'text' && (
                  <Field
                    className='w-full h-44 px-10 max-w-169 border bg-black font-body focus:outline-none focus:border-yellow text-white block border-white rounded text-16'
                    name={`customer.${field.name}`}
                    placeholder={field.placeholder}
                  />
                )}
                {field.type === 'select' && (
                  <Field
                    defaultValue={''}
                    className='w-full h-44 px-8 max-w-169 border bg-black font-body focus:outline-none focus:border-yellow text-white block border-white rounded text-16'
                    name={`customer.${field.name}`}
                    as={field.type}
                    value={
                      otherKnowFrom ? 'other' : values.customer?.[field.name]
                    }
                    onChange={(e: any) => {
                      const selectedValue = e.target.value

                      if (selectedValue === 'Jiné') {
                        setOtherKnowFrom(true)
                        handleValueChange(field.name, '')
                      } else {
                        setOtherKnowFrom(false)
                        handleValueChange(field.name, selectedValue)
                      }
                    }}
                  >
                    <option value='' key={0}>
                      Vyberte z následujících možností
                    </option>
                    {knowFromSources?.map((data, index) => {
                      return (
                        <option key={index} value={data.know_from}>
                          {data.know_from}
                        </option>
                      )
                    })}
                  </Field>
                )}
              </div>

              {errors.customer?.[field.name] &&
                touched.customer?.[field.name] && (
                  <InputError errorText={errors.customer?.[field.name] || ''} />
                )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
