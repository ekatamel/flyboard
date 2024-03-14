import { Branch, Vouchers } from 'types/types'
import { useFormikContext } from 'formik'
import { useToast } from '@chakra-ui/react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Virtual, Navigation, Pagination } from 'swiper/modules'
import { Toast } from 'components/shared/Toast'
interface BranchSelectorProps {
  avaiableBranches?: Branch[]
  isLoading: boolean
}

export const BranchSelector = ({
  avaiableBranches,
  isLoading,
}: BranchSelectorProps) => {
  const toast = useToast()
  const [swiper, setSwiper] = useState<any>(null)
  const { values, setFieldValue } = useFormikContext<Vouchers>()

  if (
    !isLoading &&
    avaiableBranches &&
    avaiableBranches.length === 0 &&
    !toast.isActive('no-timeslots')
  )
    toast({
      id: 'no-timeslots',
      position: 'top',
      duration: 4000,
      isClosable: true,
      render: () => (
        <Toast
          status={'error'}
          title={'Nebyly nalezeny žádné termíny'}
          description={
            'Zkuste prosím později nebo kontaktujte nás na info@flyboardshow.cz nebo na telefonním čísle +420 721 212 719'
          }
        />
      ),
    })

  if (!avaiableBranches) return null
  return (
    <Swiper
      modules={[Virtual, Navigation, Pagination]}
      navigation={true}
      onSwiper={setSwiper}
      centeredSlides={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
      className='branch-swiper'
    >
      {avaiableBranches?.map((branch, index) => {
        const isBranchSelected = values.branch_id === branch.id
        return (
          <SwiperSlide
            key={branch.id}
            virtualIndex={index}
            onClick={() => {
              swiper.slideTo(index)

              if (isBranchSelected) {
                setFieldValue('branch_id', null)
                setFieldValue('branch_name', null)
              } else {
                setFieldValue('branch_id', branch.id)
                setFieldValue('branch_name', branch.name)
              }

              setFieldValue('time', null)
              setFieldValue('timeslot_id', null)
            }}
            className={clsx(
              isBranchSelected ? 'bg-yellow' : 'bg-white',
              'flex items-center justify-center cursor-pointer',
            )}
          >
            <div
              key={branch.id}
              className={clsx(
                'font-title h-34 xl:h-44 flex items-center bg-white text-14 ',
                isBranchSelected && 'bg-yellow',
              )}
            >
              {branch.name}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
