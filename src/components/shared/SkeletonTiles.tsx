import { Skeleton } from '@chakra-ui/react'

interface SkeletonTilesProps {
  number: number
}

export const SkeletonTiles = ({ number }: SkeletonTilesProps) => {
  return (
    <div className='flex flex-wrap justify-center m-20 gap-30'>
      {Array.from(Array(number)).map((_, index) => (
        <Skeleton
          key={index}
          width={{
            base: '114px',
            lg: '166px',
          }}
          height={{
            base: '100px',
            lg: '138px',
          }}
          startColor='gray.900'
          endColor='gray.1000'
          borderRadius={'10px'}
        />
      ))}
    </div>
  )
}
