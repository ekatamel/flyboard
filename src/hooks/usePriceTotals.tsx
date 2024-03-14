import { Order } from 'types/types'
import { useFormikContext } from 'formik'
import { formatPrice } from 'utils/utils'

export const usePriceTotals = () => {
  const { values } = useFormikContext<Order>()

  const totalLessonsPrice = values.lessonType.reduce((acc, lesson) => {
    return acc + lesson.discountedPrice
  }, 0)

  const totalExtrasPrice =
    values.extras?.reduce((acc, extra) => {
      return acc + extra.discountedPrice * extra.quantity
    }, 0) || 0

  const totalMerchPrice =
    values.merch?.reduce((acc, merch) => {
      return acc + merch.discountedPrice * merch.quantity
    }, 0) || 0

  const totalPrice = totalLessonsPrice + totalExtrasPrice + totalMerchPrice

  const totalDiscountValue =
    values.discountCodeId && values.discountInfo?.type === 'price'
      ? totalLessonsPrice * (values.discountInfo.discount / 100)
      : 0

  const totalDiscountedPrice = totalPrice - totalDiscountValue

  return {
    totalPrice: formatPrice(totalPrice),
    totalDiscountedPrice: formatPrice(totalDiscountedPrice),
    discountValue: formatPrice(totalDiscountValue),
  }
}
