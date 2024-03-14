import { Tr, Td } from '@chakra-ui/react'
import { useState } from 'react'
import { LessonType, Extras, Merch } from 'types/types'
import cross from 'assets/images/cross.svg'
import { Order } from 'types/types'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { formatPrice } from 'utils/utils'

interface BasketTableRowProps {
  item: LessonType | Extras | Merch
  type: 'lessonType' | 'extras' | 'merch'
  count?: number
  noPadding?: boolean
  isHover?: boolean
  isDeletable?: boolean
}
export const BasketTableRow = ({
  item,
  type,
  count,
  noPadding,
  isHover = true,
  isDeletable = true,
}: BasketTableRowProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const { setValues } = useFormikContext<Order>()

  const isExtrasOrMerch = type === 'merch' || type === 'extras'
  return (
    <Tr
      onMouseEnter={() => isHover && setIsHovered(true)}
      onMouseLeave={() => isHover && setIsHovered(false)}
      className='relative'
    >
      <Td
        border={'none'}
        padding={clsx(
          noPadding
            ? `5px 5px 5px ${isExtrasOrMerch ? '30px' : '5px'}`
            : '10px 10px 10px 20px',
        )}
      >
        {isExtrasOrMerch && '+ '}
        {item.name}
      </Td>
      <Td border={'none'} padding={noPadding ? '5px' : '10px 10px 10px 20px'}>
        {count}x
      </Td>
      <Td border={'none'} padding={noPadding ? '5px' : '10px 10px 10px 20px'}>
        {formatPrice(item.discountedPrice * (count || 1))},-
      </Td>
      <Td border={'none'} padding={noPadding ? '5px' : '10px 30px 10px 10px'}>
        CZK
      </Td>
      {isDeletable && isHovered && item.discountedPrice !== 0 && (
        <img
          src={cross}
          alt='Cross icon'
          className='absolute right-10 top-14 cursor-pointer'
          onClick={() => {
            setValues(values => {
              if (type === 'lessonType') {
                const storedItems = [...values[type]]

                const itemIndexToDelete = storedItems.findIndex(storedItem => {
                  return (
                    (storedItem as LessonType).code ===
                    (item as LessonType).code
                  )
                })

                if (itemIndexToDelete !== -1)
                  storedItems.splice(itemIndexToDelete, 1)

                return {
                  ...values,
                  [type]: storedItems,
                }
              } else {
                const itemToRemove = values[type]?.find(
                  product => product.id === item.id,
                )

                if (itemToRemove && itemToRemove.quantity > 1) {
                  return {
                    ...values,
                    [type]: values[type].map(product => ({
                      ...product,
                      quantity:
                        product.id === itemToRemove.id
                          ? product.quantity - 1
                          : product.quantity,
                    })),
                  }
                } else {
                  return {
                    ...values,
                    [type]: values[type].filter(
                      product => product.id !== item.id,
                    ),
                  }
                }
              }
            })
          }}
        />
      )}
    </Tr>
  )
}
