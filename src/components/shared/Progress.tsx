import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

interface ProgressProps {
  value?: number
  total: number
}

export const Progress = ({ value, total }: ProgressProps) => {
  if (!value) return null

  return (
    <CircularProgress
      value={(100 * value) / total}
      color='yellow.45'
      thickness='4px'
      trackColor={'gray.50'}
      size={'40px'}
      className='hover:scale-125 transition-all'
    >
      <CircularProgressLabel
        color={'yellow.45'}
        fontFamily={'Bebas Neue'}
        fontSize={'14'}
      >
        {value}/{total}
      </CircularProgressLabel>
    </CircularProgress>
  )
}
