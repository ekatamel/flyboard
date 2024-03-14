import { Plus } from 'assets/images/Plus'
import { Minus } from 'assets/images/Minus'
import { useEffect, useState } from 'react'
import { InfoOverlay } from 'components/shared/InfoOverlay'

interface QuantitySelectorProps {
  initialQuantity?: number
  onAmountDecrease: () => void
  isDecreaseDisabled?: boolean
  onAmountIncrease: () => void
  isIncreaseDisabled?: boolean
  disabledMessage?: string
}

export const QuantitySelector = ({
  initialQuantity,
  onAmountDecrease,
  isDecreaseDisabled = false,
  onAmountIncrease,
  isIncreaseDisabled = false,
  disabledMessage,
}: QuantitySelectorProps) => {
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    initialQuantity != null && setAmount(initialQuantity)
  }, [initialQuantity])

  return (
    <div className='flex items-center justify-center gap-10 mt-2 lg:mt-8 h-40'>
      {amount !== 0 && (
        <>
          <Minus
            disabled={isDecreaseDisabled}
            onClick={() => {
              amount !== 0 && setAmount(amount - 1)
              onAmountDecrease()
            }}
          />

          <span className='text-white font-title text-24 lg:text-heading'>
            {amount}
          </span>
        </>
      )}

      <InfoOverlay
        label={
          <p className='font-body text-12 lg:text-14 normal-case tracking-normal tooltip'>
            {disabledMessage}
          </p>
        }
        content={
          <div>
            <Plus
              disabled={isIncreaseDisabled}
              onClick={() => {
                setAmount(amount + 1)
                onAmountIncrease()
              }}
            />
          </div>
        }
        showLabel={isIncreaseDisabled && !isDecreaseDisabled}
      />
    </div>
  )
}
