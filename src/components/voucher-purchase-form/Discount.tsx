import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Response, Order } from 'types/types'
import { Button } from '../shared/Button'
import { TextInput } from 'components/shared/TextInput'

import { useFormikContext } from 'formik'
import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { validateDiscountCode } from 'utils/requests'
import { Toast } from 'components/shared/Toast'
import {
  getDiscountDisabledMessage,
  getToastMessageForDiscount,
  removeDiscount,
} from 'utils/utils'
import { InfoOverlay } from 'components/shared/InfoOverlay'

export const Discount = () => {
  const toast = useToast()

  const { setFieldValue, setValues } = useFormikContext<Order>()

  const [value, setValue] = useState('')

  const { values } = useFormikContext<Order>()

  const { mutate: validateDiscount } = useMutation(validateDiscountCode, {
    onSuccess: data => {
      const status = data.code === 200 ? 'success' : 'error'
      const toastMessage = getToastMessageForDiscount(status, data)

      toast({
        position: 'top',
        status,
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast
            status={status}
            title={toastMessage.title}
            description={toastMessage.description}
          />
        ),
      })
      if (status === 'success') {
        setFieldValue(
          'discountCodeId',
          data?.discount?.id ?? data.customer_discount.id,
        )
        setFieldValue('discountInfo', {
          code:
            data?.discount?.discount_code ??
            data.customer_discount.discount_code,
          discount:
            data?.discount?.discount_value ??
            data.customer_discount.discount_value,
          type:
            data?.discount?.discount_type ??
            data.customer_discount.discount_type,
        })
        setValue('')
      }
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
            title={
              data.message_headline ||
              'Něco se pokazilo. Kontaktujte nás prosím.'
            }
          />
        ),
      })
    },
  })

  const isDiscountApplied = !!values.discountCodeId && !!values.discountInfo

  const noDiscountedLesson = values.lessonType.every(
    storedLesson =>
      storedLesson.discountedPrice === storedLesson.price &&
      storedLesson.discount === 0,
  )
  const isLessonSelected = values.lessonType.length > 0
  const isDiscountCodeApplicable =
    !values.discountCodeId && noDiscountedLesson && isLessonSelected

  const toastMessage = getDiscountDisabledMessage(
    isLessonSelected,
    isDiscountApplied,
    noDiscountedLesson,
  )

  return (
    <div className='flex w-full items-center justify-center gap-20'>
      <label className='text-textGray font-title label text-16 whitespace-nowrap'>
        Slevový kód
      </label>

      <InfoOverlay
        label={
          <p className='font-body text-12 lg:text-14 normal-case tracking-normal'>
            {toastMessage}
          </p>
        }
        showLabel={!isDiscountCodeApplicable}
        content={
          <TextInput
            value={value}
            setValue={setValue}
            disabled={!isDiscountCodeApplicable}
            className='md:w-120 lg:w-200'
          />
        }
      />

      {isDiscountApplied ? (
        <Button
          title='Odebrat slevu'
          type='button'
          variant='primary'
          onClick={() => removeDiscount(values, setValues)}
          isRounded={false}
        />
      ) : (
        <Button
          title='Aplikovat'
          type='button'
          variant='primary'
          disabled={!isDiscountCodeApplicable || !value.trim()}
          onClick={() => validateDiscount(value)}
          isRounded={false}
        />
      )}
    </div>
  )
}
