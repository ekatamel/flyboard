import { Skeleton } from '@chakra-ui/react'
import clsx from 'clsx'

export const SkeletonCarousel = () => {
  return (
    <div className='flex justify-center lg:justify-between my-20 gap-20'>
      {Array.from(Array(3)).map((_, index) => (
        <Skeleton
          key={index}
          width={{
            base: '242px',
            sm: '266px',
            md: '242px',
            lg: '327px',
            xl: '318px',
          }}
          height={{
            base: '263px',
            xl: '380px',
          }}
          startColor='gray.900'
          endColor='gray.1000'
          borderRadius={'10px'}
          className={clsx(index !== 0 && 'hidden md:block')}
        />
      ))}
    </div>
  )
}
