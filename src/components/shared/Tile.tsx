import { clsx } from 'clsx'
import { FunctionComponent, SVGProps, useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { Alert } from 'assets/images/Alert'
import { Badge } from './Badge'

interface TileProps {
  disabled?: boolean
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>
  title: string
  subtitle?: string | number
  isSelected?: boolean
  onClick: () => void
  overlay?: JSX.Element | null
  tooltip?: string
  badgeText?: string
}

export const Tile = ({
  disabled,
  title,
  subtitle,
  isSelected = false,
  icon: Icon,
  onClick,
  overlay,
  tooltip,
  badgeText,
}: TileProps) => {
  const [isHovered, setIsHovered] = useState(false)

  if (overlay) return overlay

  return (
    <div
      className={clsx(
        'lg:w-168 lg:h-140 lg:text-16 text-12 w-114 h-100 rounded font-title cursor-pointer text-center flex flex-col gap-8 justify-between items-center lg:p-20 p-10 relative overflow-hidden ',

        isSelected && !overlay
          ? 'bg-yellow text-black hover:scale-105 transition hover:shadow-custom-yellow'
          : disabled
          ? 'bg-black text-mediumGray  border border-mediumGray'
          : 'bg-black text-yellow border border-yellow hover:bg-yellow hover:text-black ',

        overlay && 'border border-yellow ',
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={!disabled ? onClick : undefined}
    >
      {badgeText && (
        <Badge text={badgeText} isHighlighted={isHovered || isSelected} />
      )}
      {disabled && (
        <div
          className={clsx(
            'absolute top-10 lg:top-20 -left-30 lg:-left-24 text-10 lg:text-12 w-100 -rotate-45 bg-mediumGray text-black',
          )}
        >
          Připravujeme
        </div>
      )}

      {title}
      {Icon && (
        <Icon
          fill={clsx(
            disabled
              ? '#837e7e'
              : isSelected
              ? 'black'
              : isHovered
              ? 'black'
              : 'rgba(255, 234, 0, 1)',
          )}
        />
      )}
      <span
        className={clsx(isSelected || isHovered ? 'text-black' : 'text-white')}
      >
        {subtitle}
      </span>
      {tooltip && (
        <Tooltip
          display={{ base: 'none', lg: 'block' }}
          label={<p>{tooltip}</p>}
        >
          <span className='absolute top-5 right-8'>
            <Alert
              className='w-20'
              fill={isSelected || isHovered ? '#000000' : '#FFEA00'}
            />
          </span>
        </Tooltip>
      )}
    </div>
  )
}
