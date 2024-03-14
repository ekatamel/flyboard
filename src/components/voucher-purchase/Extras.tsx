import { Layout } from 'components/shared/Layout'
import { Basket } from '../voucher-purchase-form/Basket'
import { Tile } from '../shared/Tile'
import { useQuery } from 'react-query'
import { ExtrasInfo, Order, Extras as ExtrasType } from 'types/types'
import { fetchExtras } from 'utils/requests'
import { QuantitySelector } from 'components/voucher-purchase-form/QuantitySelector'
import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { SkeletonTiles } from 'components/shared/SkeletonTiles'
import { useToast } from '@chakra-ui/react'
import { Toast } from 'components/shared/Toast'
import { motion } from 'framer-motion'
import { bestSellerItemIds, listVariants } from 'utils/utils'

export const Extras = () => {
  const toast = useToast()

  const {
    data: extras,
    isLoading,
    isError,
  } = useQuery<ExtrasInfo[]>('extras', fetchExtras)

  const bestSellerExtraIds = bestSellerItemIds.extras

  const { values } = useFormikContext<Order>()

  if (isError && !toast.isActive('extras-error'))
    toast({
      id: 'extras-error',
      position: 'top',
      status: 'error',
      duration: 4000,
      isClosable: true,
      render: () => (
        <Toast
          status={'error'}
          title={'Nepodařilo se načíst produkty. Zkuste prosím později.'}
        />
      ),
    })

  const preSelectedExtras = values.lessonType
    .map(lesson => {
      return lesson.extras?.map(extra => {
        return extra
      })
    })
    .flat() as ExtrasType[]

  const uniquePreSelectedExtras = preSelectedExtras.reduce(
    (acc: Record<number, ExtrasType>, extra: ExtrasType) => {
      if (!acc[extra.id]) {
        acc[extra.id] = {
          ...extra,
          quantity: 1,
        }
      } else {
        acc[extra.id].quantity++
      }

      return acc
    },

    {},
  )

  const preSelectedExtrasArray = Object.values(uniquePreSelectedExtras)

  const totalSelectedExtrasQuantity =
    values.extras?.reduce((acc, extra) => {
      return acc + extra.quantity
    }, 0) || 0

  const preSelectedExtrasQuantity = values.lessonType.reduce((acc, lesson) => {
    return acc + (lesson.extras?.length || 0)
  }, 0)

  const totalSelectedQuantity =
    totalSelectedExtrasQuantity + preSelectedExtrasQuantity

  const allExtraItems = [
    ...preSelectedExtrasArray,
    ...(extras || []),
  ] as ExtrasInfo[]

  return (
    <Layout
      stepName='Videozáznam'
      title='Vzpomínka na celý život'
      rightPart={<Basket />}
    >
      <p className='text-white mt-20 lg:mt-38 text-14 lg:text-16 text-center mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
        81% zákazníků si vyzkouší létání pouze jednou. Proto Vám doporučujeme si
        nechat natočit emoce z prvních pokusů z bezprostřední blízkosti vodního
        skútru. Takové záběry bohužel ze břehu natočit nejdou. Nebudete litovat!
      </p>

      {isLoading ? (
        <SkeletonTiles number={3} />
      ) : (
        <motion.div
          variants={listVariants}
          className='mt-60 mb-124 flex flex-wrap gap-28 justify-center mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'
          initial='initial'
          animate='animate'
        >
          {allExtraItems.map((extra, index) => {
            if (extra.price === 0 && !extra.quantity) return null
            return (
              <ExtrasItem
                key={index}
                extra={extra}
                preSelectedQuantity={extra.quantity}
                totalSelectedQuantity={totalSelectedQuantity}
                isBestseller={bestSellerExtraIds.includes(extra.id)}
              />
            )
          })}
        </motion.div>
      )}
    </Layout>
  )
}
interface ExtrasItemProps {
  extra: ExtrasInfo
  preSelectedQuantity?: number
  totalSelectedQuantity: number
  isBestseller?: boolean
}

const ExtrasItem = ({
  extra,
  preSelectedQuantity,
  totalSelectedQuantity,
  isBestseller,
}: ExtrasItemProps) => {
  const [isSelected, setIsSelected] = useState(false)
  const { values, setValues } = useFormikContext<Order>()

  const lessonsNumber = values.lessonType.length

  const selectedExtra = values.extras?.find(product => product.id === extra.id)

  const onAmountDecrease = () => {
    setValues(storedValues => {
      const extraToRemove = storedValues.extras?.find(
        product => product.id === extra.id,
      )

      if (extraToRemove && extraToRemove.quantity > 1) {
        return {
          ...storedValues,
          extras: storedValues.extras.map(product => ({
            ...product,
            quantity:
              product.id === extraToRemove.id
                ? product.quantity - 1
                : product.quantity,
          })),
        }
      } else {
        setIsSelected(false)
        return {
          ...storedValues,
          extras: storedValues.extras.filter(
            product => product.id !== extra.id,
          ),
        }
      }
    })
  }

  const onAmountIncrease = () => {
    setValues(storedValues => {
      const extraToAdd = storedValues.extras?.find(
        product => product.id === extra.id,
      )

      if (extraToAdd) {
        return {
          ...storedValues,
          extras: storedValues.extras.map(product => ({
            ...product,
            quantity:
              product.id === extraToAdd.id
                ? product.quantity + 1
                : product.quantity,
          })),
        }
      } else {
        return {
          ...storedValues,
          extras: [
            ...(storedValues.extras || []),
            {
              id: extra.id,
              discountedPrice: extra.price,
              name: extra.name,
              quantity: 1,
            },
          ],
        }
      }
    })
  }

  useEffect(() => {
    ;(selectedExtra || preSelectedQuantity) && setIsSelected(true)
  }, [selectedExtra, preSelectedQuantity])

  return (
    <div className='flex flex-col'>
      <Tile
        badgeText={isBestseller ? 'Bestseller' : undefined}
        key={extra.id}
        title={extra.name}
        subtitle={`${extra.price},-`}
        isSelected={isSelected}
        onClick={() => {
          if (preSelectedQuantity) return
          if (isSelected) {
            setValues(values => {
              const filteredExtras = values.extras?.filter(
                extraItem => extraItem.id !== extra.id,
              )
              return {
                ...values,
                extras: filteredExtras,
              }
            })
            setIsSelected(false)
          } else if (lessonsNumber > totalSelectedQuantity) {
            setValues(values => {
              return {
                ...values,
                extras: [
                  ...(values.extras || []),
                  {
                    id: extra.id,
                    discountedPrice: extra.price,
                    name: extra.name,
                    quantity: 1,
                  },
                ],
              }
            })
          }
        }}
      />
      {isSelected && (
        <QuantitySelector
          initialQuantity={preSelectedQuantity || selectedExtra?.quantity || 0}
          onAmountDecrease={onAmountDecrease}
          isDecreaseDisabled={!!preSelectedQuantity}
          onAmountIncrease={onAmountIncrease}
          isIncreaseDisabled={
            !!preSelectedQuantity || lessonsNumber === totalSelectedQuantity
          }
          disabledMessage='Maximálně můžete přidat pouze tolik videí, kolik odpovídá počtu
          zakoupených lekcí.'
        />
      )}
    </div>
  )
}
