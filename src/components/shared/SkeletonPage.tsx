import { Layout } from 'components/shared/Layout'
import { Skeleton } from '@chakra-ui/react'
import { SkeletonCarousel } from 'components/shared/SkeletonCarousel'

export const SkeletonPage = () => {
  return (
    <Layout stepName='' title='' isLoading={true}>
      <Skeleton
        height={'40px'}
        startColor='gray.900'
        endColor='gray.1000'
        className='mb-60'
      />
      <SkeletonCarousel />
    </Layout>
  )
}
