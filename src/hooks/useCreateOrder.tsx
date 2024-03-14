import { createOrder } from 'utils/requests'
import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { Toast } from 'components/shared/Toast'
import { Order, OrderPostType } from 'types/types'
import { useFormikContext } from 'formik'
import { FormNavigationContext } from 'context/VoucherFormNavigationContext'
import { groupItemsAndCount, sendPDFs } from 'utils/utils'
import { useContext } from 'react'

export const useCreateOrder = () => {
  const toast = useToast()

  const { values, setFieldValue } = useFormikContext<Order>()
  const { goToNextStep } = useContext(FormNavigationContext)

  const groupedExtras = groupItemsAndCount(values.lessonType, 'extras')
  const groupedMerch = groupItemsAndCount(values.lessonType, 'merch')

  const { mutate: sendNewOrder, isLoading } = useMutation(createOrder, {
    onSuccess: data => {
      setFieldValue('orderId', data.id)
      setFieldValue('variableSymbol', data.payment_info.variable_symbol)
      setFieldValue('qr_code', data.payment_info.qr_code)

      data.vouchers && sendPDFs(data.vouchers)

      goToNextStep()
    },
    onError: () => {
      toast({
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast
            status={'error'}
            title={'Něco se pokazilo. Kontaktujte nás prosím.'}
          />
        ),
      })
    },
  })

  const createAndSendOrder = () => {
    const order: OrderPostType = {
      order_data: {
        order_type: 'voucher',
        customer: {
          ...values.customer,
          gdpr: true,
        },
        discounts: {
          discount_type: values.discountInfo?.type || '',
          discount_id: values.discountCodeId || 0,
        },
        merch: [...(values.merch ?? []), ...Object.values(groupedMerch)],
        extras: [...(values.extras ?? []), ...Object.values(groupedExtras)],
        message: '',
        lessonType: values.lessonType.map(lesson => {
          return {
            id: lesson.id,
            code: lesson.code,
            price: lesson.price,
            discountedPrice: lesson.discountedPrice,
            discount: lesson.discount,
            voucherName: lesson.voucherName,
          }
        }),
      },
    }
    return sendNewOrder(order)
  }

  return { createAndSendOrder, isLoading }
}
