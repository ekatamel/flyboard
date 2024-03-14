import { Layout } from 'components/shared/Layout'
import { ValidityFilter } from './ValidityFilter'
import { Basket } from './Basket'
import { useNavigate } from 'react-router-dom'
import { Lesson, Order } from 'types/types'
import { FormNavigationContext } from 'context/VoucherFormNavigationContext'
import { useContext, useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import { Discount } from './Discount'
import { LessonCarousel } from './LessonCarousel'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface LessonTypeProps {
  lessons?: Lesson[]
  uniqueValidityDates: string[]
}
export const LessonType = ({
  lessons,
  uniqueValidityDates,
}: LessonTypeProps) => {
  const navigate = useNavigate()

  const [selectedValidityDate, setSelectedValidityDate] = useState<string>(
    uniqueValidityDates[0],
  )

  const { values } = useFormikContext<Order>()

  const { setIsNextStepDisabled } = useContext(FormNavigationContext)

  useEffect(() => {
    values.lessonType.length === 0
      ? setIsNextStepDisabled(true)
      : setIsNextStepDisabled(false)
  }, [setIsNextStepDisabled, values.lessonType.length])

  return (
    <Layout
      stepName='Typ lekce'
      title='Vyberte typ lekce'
      leftPart={
        <ValidityFilter
          uniqueValidityDates={uniqueValidityDates}
          selectedValidityDate={selectedValidityDate}
          setSelectedValidityDate={setSelectedValidityDate}
        />
      }
      rightPart={<Basket />}
      bottomCenterPart={
        <div className='w-full flex justify-between sm:mx-0 mb-24 md:mb-0 xl:mb-0 '>
          <Discount />
        </div>
      }
      onPreviosStepClick={() => navigate('/')}
    >
      <LessonCarousel
        lessons={lessons}
        selectedValidityDate={selectedValidityDate}
      />
    </Layout>
  )
}
