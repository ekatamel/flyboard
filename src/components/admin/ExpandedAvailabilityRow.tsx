import { useEffect, useState } from 'react'
import { Lector, TimeslotsByDay } from 'types/types'
import { isBeforeNoon, selectStyles } from 'utils/utils'
import { AvailabilityTimeslots } from './AvailabilityTimeslots'
import { useQuery, useQueryClient } from 'react-query'
import {
  deleteDayTimeslots,
  fetchLectors,
  updateTimeslots,
} from 'utils/requests'
import Select from 'react-select'
import { AdminButton } from 'components/shared/AdminButton'
import { Toast } from 'components/shared/Toast'
import { useToast } from '@chakra-ui/react'

interface ExpandedAvailabilityRowProps {
  timeslot: TimeslotsByDay
  toggleExpanded: () => void
}

export const ExpandedAvailabilityRow = ({
  timeslot,
  toggleExpanded,
}: ExpandedAvailabilityRowProps) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { data: lectors } = useQuery<Lector[]>('lectors', fetchLectors)
  const { timeslots, date, branch_id } = timeslot

  const [changedTimeslots, setChangedTimeslots] = useState<Record<
    number,
    boolean
  > | null>(null)

  const [timeslotLectors, setTimeslotLectors] = useState<
    { value: number; label: string }[] | null
  >(null)

  const lectorsOptions = lectors?.map(
    ({ id, first_name, last_name, nickname }) => {
      return { value: id, label: `${first_name} ${last_name} (${nickname})` }
    },
  )

  const preselectedLectorsOptions = timeslots[0].lecturers
    .map(lecturer => {
      const lector = lectorsOptions?.find(
        lector => lector.value === lecturer.id,
      )

      if (!lector) return

      return {
        value: lecturer.id,
        label: lector.label,
      }
    })
    .filter(Boolean) as { value: number; label: string }[]

  const timeslotsBeforeNoon = timeslots.filter(timeslot =>
    isBeforeNoon(timeslot.time),
  )

  const timeslotsAfterNoon = timeslots.filter(
    timeslot => !isBeforeNoon(timeslot.time),
  )

  const deleteDay = async () => {
    await deleteDayTimeslots({ date, branch_id })
    queryClient.invalidateQueries('timeslots')
    toast({
      position: 'top',
      status: 'success',
      duration: 4000,
      isClosable: true,
      render: () => (
        <Toast
          status={'success'}
          title={'Timesloty pro daný den byly úspěšně smazány'}
        />
      ),
    })
  }

  const cancelChanges = () => {
    setChangedTimeslots(null)
    setTimeslotLectors(preselectedLectorsOptions)
    toggleExpanded()
  }

  const updateTimeslotInfo = async () => {
    const updatedTimeslots = timeslots.map(({ timeslotId, isActive }) => {
      return {
        timeslot_id: timeslotId,
        is_active: changedTimeslots?.[Number(timeslotId)] ?? isActive,
        lectors: timeslotLectors?.map(lector => ({ id: lector.value })) || [],
      }
    })

    const updatedDayTimeslots = {
      date,
      branch_id,
      timeslots: updatedTimeslots,
    }

    try {
      await updateTimeslots(updatedDayTimeslots)
      queryClient.invalidateQueries('timeslots')
      toggleExpanded()
      toast({
        position: 'top',
        status: 'success',
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast status={'success'} title={'Změny byly úspěšně uloženy.'} />
        ),
      })
    } catch (error) {
      toast({
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
        render: () => (
          <Toast
            status={'error'}
            title={'Něco se nepovedlo - kontaktujte správce systému'}
          />
        ),
      })
    }
  }

  useEffect(() => {
    setChangedTimeslots(
      timeslots.reduce((acc: Record<number, boolean>, timeslot) => {
        acc[timeslot.timeslotId] = timeslot.isActive
        return acc
      }, {}),
    )
  }, [timeslots])

  useEffect(() => {
    lectors && setTimeslotLectors(preselectedLectorsOptions)
  }, [lectors])

  return (
    <div className='flex flex-col gap-30 pt-22 px-10 pb-10'>
      <div className='flex'>
        <p className='font-title text-yellow text-14 w-120'>Lektoří</p>
        <Select
          options={lectorsOptions}
          isMulti
          styles={selectStyles}
          value={timeslotLectors}
          onChange={(option: any) => setTimeslotLectors(option)}
        />
      </div>
      <div className='flex'>
        <p className='font-title text-yellow text-14 w-120 shrink-0'>Ráno</p>
        <AvailabilityTimeslots
          timeslots={timeslotsBeforeNoon}
          changedTimeslots={changedTimeslots}
          setChangedTimeslots={setChangedTimeslots}
        />
      </div>
      <div className='flex'>
        <p className='font-title text-yellow text-14 w-120 shrink-0'>Večer</p>
        <AvailabilityTimeslots
          timeslots={timeslotsAfterNoon}
          changedTimeslots={changedTimeslots}
          setChangedTimeslots={setChangedTimeslots}
        />
      </div>
      <div className='flex gap-20 justify-end'>
        <AdminButton
          title='Smazat den'
          onClick={() => deleteDay()}
          className='bg-red border-black text-black'
        />
        <AdminButton
          title='Zrušit'
          className='bg-black border-yellow text-yellow'
          onClick={() => cancelChanges()}
        />
        <AdminButton
          title='Uložit'
          className='bg-yellow border-yellow text-black'
          onClick={() => updateTimeslotInfo()}
        />
      </div>
    </div>
  )
}
