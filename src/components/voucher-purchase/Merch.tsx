import { Layout } from 'components/shared/Layout'
import { Basket } from '../voucher-purchase-form/Basket'
import { useQuery } from 'react-query'
import { fetchMerch } from 'utils/requests'
import { MerchInfo, Order, Merch as MerchType } from 'types/types'
import { Tile } from '../shared/Tile'
import { QuantitySelector } from 'components/voucher-purchase-form/QuantitySelector'
import { useContext, useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import cross from 'assets/images/cross.svg'
import clsx from 'clsx'
import { SkeletonTiles } from 'components/shared/SkeletonTiles'
import { useToast } from '@chakra-ui/react'
import { Toast } from 'components/shared/Toast'
import {
  bestSellerItemIds,
  listVariants,
  merchToIconUrlMapping,
} from 'utils/utils'
import { motion } from 'framer-motion'
import { FormNavigationContext } from 'context/VoucherFormNavigationContext'

export const Merch = () => {
  const toast = useToast()

  const { values } = useFormikContext<Order>()

  const { setIsNextStepDisabled, currentStepIndex } = useContext(
    FormNavigationContext,
  )

  const {
    data: merch,
    isLoading,
    isError,
  } = useQuery<MerchInfo[]>('merch', fetchMerch)

  const bestSellerMerchIds = bestSellerItemIds.merch

  if (isError && !toast.isActive('merch-error'))
    toast({
      id: 'merch-error',
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

  const preSelectedMerch = values.lessonType
    .map(lesson => {
      return lesson.merch?.map(merch => {
        return merch
      })
    })
    .flat() as MerchType[]

  const uniquePreSelectedMerch = preSelectedMerch.reduce(
    (acc: Record<number, MerchType>, merch: MerchType) => {
      if (!acc[merch.id]) {
        acc[merch.id] = {
          ...merch,
          quantity: 1,
        }
      } else {
        acc[merch.id].quantity++
      }

      return acc
    },

    {},
  )

  const preSelectedMerchArray = Object.values(uniquePreSelectedMerch)

  const allMerchItems = [
    ...preSelectedMerchArray,
    ...(merch || []),
  ] as MerchInfo[]

  const merchSizesMap = new Map(
    allMerchItems.map(merch => [
      merch.id,
      Object.keys(merch.available_sizes).length > 0,
    ]),
  )

  const merchHasSizes =
    !!values.merch &&
    values.merch?.every(
      merch =>
        merchSizesMap.get(merch.id) === false ||
        (merchSizesMap.get(merch.id) && merch.size),
    )

  const preselectedMerchHasSizes = values.lessonType.every(
    lesson =>
      lesson.merch?.length === 0 ||
      lesson.merch?.every(
        merch =>
          merchSizesMap.get(merch.id) === false ||
          (merchSizesMap.get(merch.id) && merch.size),
      ),
  )

  useEffect(() => {
    ;(values.merch?.length > 0 && !merchHasSizes) || !preselectedMerchHasSizes
      ? setIsNextStepDisabled(true)
      : setIsNextStepDisabled(false)

    return () => {
      setIsNextStepDisabled(false)
    }
  }, [setIsNextStepDisabled, values.merch, currentStepIndex, values.lessonType])

  return (
    <Layout stepName='Merch' title='Něco na sebe?' rightPart={<Basket />}>
      <p className='text-white flex flex-col text-14 lg:text-16 text-center mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'>
        <span>Nění důležité létat nejlíp, ale hlavně být nejkrásnější!</span>
        <span>
          Nákupem FBS merche finančně podpoříte trénink mladých nadějných
          flyboardistů a budoucí generace reprezentantů.
        </span>
      </p>

      {isLoading ? (
        <SkeletonTiles number={6} />
      ) : (
        <motion.div
          variants={listVariants}
          className='mt-30 flex flex-wrap gap-x-28 gap-y-10 justify-center xl:justify-left mx-20 sm:mx-44 md:mx-80 lg:mx-100 xl:mx-0'
          initial='initial'
          animate='animate'
        >
          {allMerchItems?.map(product => {
            if (product.price === 0 && !product.quantity) return null
            return (
              <motion.div variants={listVariants} key={product.id}>
                <MerchItem
                  product={product}
                  preSelectedQuantity={product.quantity}
                  isBestseller={bestSellerMerchIds.includes(product.id)}
                />
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </Layout>
  )
}

interface MerchItemProps {
  product: MerchInfo
  preSelectedQuantity?: number
  isBestseller?: boolean
}

export const MerchItem = ({
  product,
  preSelectedQuantity,
  isBestseller,
}: MerchItemProps) => {
  const [isSelected, setIsSelected] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [sizeSelected, setSizeSelected] = useState<string | null>(null)

  const { values, setValues } = useFormikContext<Order>()

  const onAmountDecrease = () => {
    setValues(storedValues => {
      const merchToRemove = storedValues.merch?.find(
        merch => merch.id === product.id,
      )

      if (merchToRemove && merchToRemove.quantity > 1) {
        return {
          ...storedValues,
          merch: storedValues.merch.map(product => ({
            ...product,
            quantity:
              product.id === merchToRemove.id
                ? product.quantity - 1
                : product.quantity,
          })),
        }
      } else {
        setIsSelected(false)
        return {
          ...storedValues,
          merch: storedValues.merch.filter(merch => merch.id !== product.id),
        }
      }
    })
  }

  const onAmountIncrease = () => {
    setValues(storedValues => {
      const merchToAdd = storedValues.merch?.find(
        merch => merch.id === product.id,
      )

      if (merchToAdd) {
        return {
          ...storedValues,
          merch: storedValues.merch.map(product => ({
            ...product,
            quantity:
              product.id === merchToAdd.id
                ? product.quantity + 1
                : product.quantity,
          })),
        }
      } else {
        return {
          ...storedValues,
          merch: [
            ...(storedValues.merch || []),
            {
              id: product.id,
              discountedPrice: product.price,
              name: product.name,
              quantity: 1,
            },
          ],
        }
      }
    })
  }

  const sizes = Object.values(product.available_sizes)

  const selectedMerch = values.merch?.find(
    merchItem => merchItem.id === product.id,
  )

  useEffect(() => {
    ;(selectedMerch || preSelectedQuantity) && setIsSelected(true)
  }, [selectedMerch, preSelectedQuantity])

  const icon = merchToIconUrlMapping[product.id]

  return (
    <div className='flex flex-col lg:h-196 h-150' key={product.id}>
      <Tile
        badgeText={isBestseller ? 'Bestseller' : undefined}
        tooltip={
          sizes.length > 0
            ? 'Daná položka vyžaduje výběr velikosti. Klikněte na položku pro výber velikosti'
            : undefined
        }
        title={product.name}
        icon={icon}
        subtitle={`${product.price},-`}
        isSelected={isSelected}
        onClick={() => {
          if (preSelectedQuantity && sizes.length > 0) {
            setShowOverlay(true)
            return
          }
          if (isSelected && !preSelectedQuantity) {
            setValues(values => {
              const filteredMerch = values.merch?.filter(
                merchItem => merchItem.id !== product.id,
              )
              return {
                ...values,
                merch: filteredMerch,
              }
            })
            setIsSelected(false)
            setSizeSelected(null)
          } else if (!preSelectedQuantity) {
            setValues(values => {
              return {
                ...values,
                merch: [
                  ...(values.merch || []),
                  {
                    id: product.id,
                    discountedPrice: product.price,
                    name: product.name,
                    quantity: 1,
                  },
                ],
              }
            })
            setIsSelected(true)
            sizes.length > 0 && setShowOverlay(true)
          }
        }}
        overlay={
          sizes.length > 0 && showOverlay ? (
            <SizeOverlay
              isPreSelected={!!preSelectedQuantity}
              product={product}
              sizes={sizes}
              setShowOverlay={setShowOverlay}
              sizeSelected={sizeSelected}
              setSizeSelected={setSizeSelected}
            />
          ) : null
        }
      />
      {isSelected && (
        <QuantitySelector
          onAmountDecrease={() => {
            onAmountDecrease()
            selectedMerch?.quantity === 1 && setShowOverlay(false)
          }}
          isDecreaseDisabled={!!preSelectedQuantity}
          onAmountIncrease={onAmountIncrease}
          isIncreaseDisabled={!!preSelectedQuantity}
          initialQuantity={preSelectedQuantity || selectedMerch?.quantity || 0}
        />
      )}
    </div>
  )
}

interface SizeOverlayProps {
  sizes: string[]
  product: MerchInfo
  setShowOverlay: (show: boolean) => void
  sizeSelected: string | null
  setSizeSelected: (size: string | null) => void
  isPreSelected: boolean
}

const SizeOverlay = ({
  sizes,
  product,
  setShowOverlay,
  sizeSelected,
  setSizeSelected,
  isPreSelected,
}: SizeOverlayProps) => {
  const widthDenominator =
    (sizes.length + 1) % 2 === 0
      ? (sizes.length + 1) / 2
      : (sizes.length + 2) / 2

  return (
    <div className='lg:w-168 lg:h-140 w-114 h-100 rounded text-base font-title cursor-pointer text-center  text-white text-22 flex flex-wrap border border-yellow'>
      {sizes.map(size => {
        return (
          <SizeCell
            key={size}
            size={size}
            product={product}
            widthDenominator={widthDenominator}
            sizeSelected={sizeSelected}
            setSizeSelected={setSizeSelected}
            isPreSelected={isPreSelected}
          />
        )
      })}
      <div
        className='p-12 flex items-center justify-center flex-1 border-yellow'
        onClick={() => setShowOverlay(false)}
      >
        <img src={cross} alt='Cross icon' />
      </div>
    </div>
  )
}

interface SizeCellProps {
  size: string
  product: MerchInfo
  widthDenominator: number
  sizeSelected: string | null
  setSizeSelected: (size: string | null) => void
  isPreSelected: boolean
}

export const SizeCell = ({
  size,
  product,
  widthDenominator,
  sizeSelected,
  setSizeSelected,
  isPreSelected,
}: SizeCellProps) => {
  const { setValues } = useFormikContext<Order>()

  const onSizeSelect = () => {
    setValues(storedValues => {
      if (isPreSelected) {
        return {
          ...storedValues,
          lessonType: storedValues.lessonType.map(lesson => {
            return {
              ...lesson,
              merch: lesson.merch?.map(merch => {
                if (merch.id === product.id) {
                  return {
                    ...merch,
                    size,
                  }
                }
                return merch
              }),
            }
          }),
        }
      }

      const selectedProducts = storedValues.merch?.filter(
        merch => merch.id === product.id,
      )

      if (!selectedProducts || selectedProducts.length === 0) {
        // Add new product with size alltogether
        return {
          ...storedValues,
          merch: [
            ...(storedValues.merch || []),
            {
              id: product.id,
              size,
              discountedPrice: product.price,
              name: product.name,
              quantity: 1,
            },
          ],
        }
      } else {
        // Add size to all products of this category
        const storedProducts = storedValues.merch.map(merch => {
          if (merch.id === product.id) {
            return {
              ...merch,
              size,
            }
          }
          return merch
        })

        return {
          ...storedValues,
          merch: [...storedProducts],
        }
      }
    })
  }

  return (
    <div
      className={clsx(
        'p-12 flex justify-center items-center border border-yellow',
        sizeSelected === size ? 'text-black' : 'text-white',
        sizeSelected === size && 'bg-yellow',
      )}
      style={{ width: `${100 / widthDenominator}%` }}
      onClick={() => {
        setSizeSelected(size)
        onSizeSelect()
      }}
    >
      {size}
    </div>
  )
}
