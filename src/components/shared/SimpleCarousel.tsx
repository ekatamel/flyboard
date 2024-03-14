import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useFormikContext } from 'formik'
import { Vouchers } from 'types/types'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SimpleSwiperProps {
  item: React.ReactNode
  index: number
  setIndex: (index: number) => void
  itemsNumber: number
  className?: string
}

export const SimpleCarousel = ({
  item,
  index,
  setIndex,
  itemsNumber,
  className,
}: SimpleSwiperProps) => {
  const { values } = useFormikContext<Vouchers>()

  const variants = {
    enter: { opacity: 0 },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: { opacity: 0 },
  }

  return (
    <div className='flex items-center lg:justify-center mb-40 xl:mb-10 justify-between mt-20 sm:px-32'>
      <ChevronLeftIcon
        color={index > 0 ? 'white' : 'gray'}
        boxSize={10}
        className='mr-20 cursor-pointer'
        onClick={() => index > 0 && setIndex(index - 1)}
      />
      <motion.div
        key={index}
        variants={variants}
        initial='enter'
        animate='center'
        exit='exit'
        transition={{ duration: 0.3 }}
        className='whitespace-nowrap relative'
      >
        <div
          className={clsx(
            'font-title text-16 lg:text-18 text-darkerGray absolute',
            className,
          )}
        >
          {index + 1}/{itemsNumber}
        </div>
        {item}
      </motion.div>
      <ChevronRightIcon
        color={index < values.vouchers.length - 1 ? 'white' : 'gray'}
        boxSize={10}
        className='ml-20  cursor-pointer'
        onClick={() =>
          index < values.vouchers.length - 1 && setIndex(index + 1)
        }
      />
    </div>
  )
}
