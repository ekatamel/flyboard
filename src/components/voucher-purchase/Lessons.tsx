import { useQuery } from 'react-query'
import { Lesson } from 'types/types'
import { Toast } from 'components/shared/Toast'
import { fetchLessons } from 'utils/requests'
import { useToast } from '@chakra-ui/react'
import { LessonType } from 'components/voucher-purchase-form/LessonsType'
import { SkeletonPage } from 'components/shared/SkeletonPage'

export const Lessons = () => {
  const toast = useToast()

  const {
    data: lessons,
    isLoading,
    isError,
  } = useQuery<Lesson[]>('lessons', fetchLessons)

  const uniqueValidityDates = lessons?.reduce((acc: string[], lesson) => {
    if (
      lesson.validity_voucher_to &&
      !acc.includes(lesson.validity_voucher_to)
    ) {
      acc.push(lesson.validity_voucher_to)
    }
    return acc.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  }, [])

  if (isError && !toast.isActive('lessons-error'))
    toast({
      id: 'lessons-error',
      position: 'top',
      status: 'error',
      duration: 4000,
      isClosable: true,
      render: () => (
        <Toast
          status={'error'}
          title={'Nepodařilo se načíst lekce. Zkuste prosím později.'}
        />
      ),
    })

  if (isLoading || !uniqueValidityDates) return <SkeletonPage />

  return (
    <LessonType lessons={lessons} uniqueValidityDates={uniqueValidityDates} />
  )
}
