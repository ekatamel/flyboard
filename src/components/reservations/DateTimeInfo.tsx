import { format } from 'date-fns'
import { useFormikContext } from 'formik'
import { Vouchers } from 'types/types'

export const DateTimeInfo = () => {
  const { values } = useFormikContext<Vouchers>()

  const date = values.date ? new Date(values.date) : undefined

  return (
    <div className='w-full flex justify-center mt-40 mb-30 md:mt-0 md:mb-0 xl:mt-10 h-40'>
      <div>
        {date && (
          <div className='flex'>
            <p className='text-textGray font-title text-16 w-80'>Termín:</p>
            <p className='text-yellow font-title text-16'>
              {format(date, 'dd.MM.yyyy')} {values.time && values.time}
            </p>
          </div>
        )}
        {values.branch_name && (
          <div className='flex'>
            <p className='text-textGray font-title text-16 w-80'>Lokalita:</p>
            <p className='text-yellow font-title text-16'>
              {values.branch_name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
