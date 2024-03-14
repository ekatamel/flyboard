import { Layout } from 'components/shared/Layout'
import { useFormikContext } from 'formik'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Vouchers, Branch, Timeslot } from 'types/types'
import { fetchBranches } from 'utils/requests'
import { useQuery } from 'react-query'
import {
  getDayPickerVariants,
  formatDateToString,
  getAvailableBranches,
  getAvailableDaysForBranch,
  getDates,
  getSelectedDayTimeslots,
  getTimeslots,
  isDisabledDate,
  getTimePickerVariants,
  getFirstAvailableMonth,
} from 'utils/utils'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import 'styles/day-picker.css'
import styles from 'styles/day-picker.module.css'
import { cs } from 'date-fns/locale'
import { useMediaQuery } from '@chakra-ui/react'
import { TimeSelector } from './TimeSelector'
import { motion } from 'framer-motion'

import { FormNavigationContext } from 'context/ReservationFormNavigationContext'
import { DateTimeInfo } from './DateTimeInfo'
import { BranchSelector } from './BranchSelector'

export const DateLocationSelector = () => {
  const { values, setFieldValue } = useFormikContext<Vouchers>()
  const { setIsNextStepDisabled } = useContext(FormNavigationContext)

  const [isXlBreakpoint] = useMediaQuery('(min-width: 1280px)')

  const [timeslots, setTimeslots] = useState<Timeslot[] | null>(null)

  const selectedDate = values.date ? new Date(values.date) : undefined

  const { data: branches, isLoading } = useQuery<Branch[]>(
    'branches',
    fetchBranches,
  )

  const avaiableBranches = useMemo(() => {
    return getAvailableBranches(timeslots, branches, selectedDate)
  }, [timeslots, branches, selectedDate])

  const availableBranchTimeslots = useMemo(
    () => getAvailableDaysForBranch(timeslots, values.branch_id),
    [timeslots, values.branch_id],
  )

  const availableBranchDates = getDates(availableBranchTimeslots)

  const selectedDayTimeslots = useMemo(() => {
    if (!selectedDate) return
    return getSelectedDayTimeslots(availableBranchTimeslots, selectedDate)
  }, [availableBranchTimeslots, selectedDate])

  const showTimeSelector =
    !!selectedDayTimeslots && selectedDayTimeslots.length && values.branch_id

  useEffect(() => {
    const isNextStepEnabled = values.date && values.branch_id && values.time

    isNextStepEnabled
      ? setIsNextStepDisabled(false)
      : setIsNextStepDisabled(true)
  }, [values, setIsNextStepDisabled])

  useEffect(() => {
    getTimeslots(values.vouchers, setTimeslots, setFieldValue)
  }, [])

  return (
    <Layout
      stepName='Termín'
      title='Vyberte si datum svého letu'
      bottomCenterPart={<DateTimeInfo />}
    >
      <p className='text-white mt-20 lg:mt-38 xl:mt-10 text-14 lg:text-16 text-center px-20 sm:px-44 md:px-80 lg:px-100 xl:px-0'>
        Zvolte datum, lokalitu a čas pro váš zážitek. Bílá pole = volné termíny,
        černá = nelétáme nebo plno.
      </p>

      <h2 className='font-title text-white text-center text-20 mt-20'>
        Dostupné lokality
      </h2>
      <div className='px-60 relative'>
        <BranchSelector
          isLoading={isLoading}
          avaiableBranches={avaiableBranches}
        />
      </div>

      <div className='flex justify-center flex-col sm:flex-row sm:px-20 md:px-60 lg:px-70 xl:px-0'>
        <motion.div
          className={styles.dayPickerContainer}
          variants={getDayPickerVariants(isXlBreakpoint)}
          initial='hidden'
          animate={showTimeSelector ? 'visible' : 'hidden'}
        >
          {availableBranchDates.length > 0 && (
            <DayPicker
              mode='single'
              className={'mt-20 text-white'}
              selected={selectedDate}
              defaultMonth={getFirstAvailableMonth(availableBranchDates)}
              onSelect={date => {
                setFieldValue('date', date && formatDateToString(date))
                setFieldValue('time', null)
                setFieldValue('timeslot_id', null)
              }}
              modifiers={{
                available: availableBranchDates,
                disabled: date => isDisabledDate(availableBranchDates, date),
              }}
              modifiersClassNames={{
                available: styles.available,
                disabled: styles.disabled,
                selected: styles.selected,
              }}
              locale={cs}
            />
          )}
          {availableBranchDates.length === 0 && (
            <DayPicker
              mode='single'
              className={'mt-20 text-white'}
              defaultMonth={new Date()}
              locale={cs}
              disabled={true}
            />
          )}
        </motion.div>
        {showTimeSelector && (
          <motion.div
            variants={getTimePickerVariants(isXlBreakpoint)}
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.2 }}
          >
            <TimeSelector timeslots={selectedDayTimeslots} />
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
