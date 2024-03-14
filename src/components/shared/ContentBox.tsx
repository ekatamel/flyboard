import clsx from 'clsx'
import { Lesson, MerchInfo, Order } from 'types/types'
import { useFormikContext } from 'formik'

import { QuantitySelector } from '../voucher-purchase-form/QuantitySelector'
import { Badge } from './Badge'

interface ContentBoxProps {
  lesson: Lesson
  isSelected?: boolean
  isBestseller?: boolean
}

export const ContentBox = ({
  lesson,
  isSelected,
  isBestseller,
}: ContentBoxProps) => {
  const { setValues, values } = useFormikContext<Order>()

  const {
    lesson_type_name: lessonTypeName,
    bullet_points_description: bulletPointsDescription,
    product,
    top_level_description: topLevelDescription,
    price,
    discounted_price: discountedPrice,
    discount,
    lesson_type_code: lessonTypeCode,
  } = lesson

  const isDiscounted = discount != null && discountedPrice !== price
  const initialQuantity = values.lessonType.reduce(
    (acc: number, storedLesson) => {
      if (storedLesson.code === lessonTypeCode) acc++
      return acc
    },
    0,
  )

  const isQuantityChangeDisabled = isDiscounted && !!values.discountCodeId

  const onAmountDecrease = () => {
    setValues(values => {
      const storedLessons = [...values.lessonType]
      const lessonIndexToDelete = storedLessons.findIndex(
        storedLesson => storedLesson.code === lessonTypeCode,
      )

      if (lessonIndexToDelete !== -1)
        storedLessons.splice(lessonIndexToDelete, 1)

      return {
        ...values,
        lessonType: storedLessons,
      }
    })
  }

  const onAmountIncrease = () => {
    setValues(values => {
      return {
        ...values,
        lessonType: [
          ...values.lessonType,
          {
            id: lesson.id,
            name: lesson.lesson_type_name,
            code: Number(lesson.lesson_type_code),
            price: lesson.price,
            discountedPrice: lesson.discounted_price,
            discount: lesson.discount,
            merch: [...lesson.merch],
            extras: [...lesson.extras],
            voucherName: '',
            validTill: lesson.validity_voucher_to,
          },
        ],
      }
    })
  }

  return (
    <>
      <div className='content-box cursor-pointer flex flex-col border border-yellow rounded-tile xl:px-34 py-20 px-16 xl:h-380 h-265 hover:shadow-custom-yellow transition relative overflow-hidden'>
        {isBestseller && (
          <Badge text={'Bestseller'} isHighlighted={isSelected} />
        )}
        <h2 className='text-yellow font-title xl:text-heading text-26 leading-tight text-center '>
          {lessonTypeName}
        </h2>
        <h3 className='text-white xl:text-subheading text-16 text-center font-title xl:mb-8 mb-8'>
          {product.length} min
        </h3>
        <p className='text-yellow text-body xl:text-14 text-10 text-justify mb-10 leading-4 2xl:leading-6'>
          {topLevelDescription}
        </p>
        <ul className='text-yellow text-body xl:text-12 text-9 list-disc pl-10'>
          {bulletPointsDescription &&
            Object.keys(bulletPointsDescription).map(index => (
              <li key={index}>{bulletPointsDescription[index]}</li>
            ))}
        </ul>
        <div className='flex-grow'></div>

        <div className='font-title xl:text-heading text-28 w-full justify-self-end flex justify-between gap-10'>
          <div
            className={clsx(
              'text-center ml-auto',
              isDiscounted && 'line-through discounted-price',
            )}
          >{`${price.toFixed(0)},-`}</div>
          {isDiscounted && (
            <div className='relative'>
              <span className='font-title absolute text-12 -top-5 left-4'>
                Akce -{discount}%
              </span>
              <span>{discountedPrice.toFixed(0)},-</span>
            </div>
          )}
        </div>
      </div>

      {isSelected && (
        <QuantitySelector
          initialQuantity={initialQuantity}
          onAmountDecrease={onAmountDecrease}
          onAmountIncrease={onAmountIncrease}
          isIncreaseDisabled={isQuantityChangeDisabled}
          disabledMessage={
            'Po aplikování slevového kódu již nelze přidat zlevněnou lekci. Slevu můžete odebrat níže.'
          }
        />
      )}
    </>
  )
}
