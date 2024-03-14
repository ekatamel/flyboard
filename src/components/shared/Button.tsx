import clsx from 'clsx'
import { Skeleton } from '@chakra-ui/react'

interface ButtonProps {
  title: string
  type?: 'submit' | 'button'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  position?: 'right' | 'left' | 'center'
  onClick?: () => void
  isRounded?: boolean
  icon?: string
  link?: string
  isLoading?: boolean
  className?: string
}

export const Button = ({
  title,
  type = 'button',
  variant,
  disabled,
  position,
  onClick,
  icon,
  isRounded = true,
  link,
  isLoading,
  className,
}: ButtonProps) => {
  if (isLoading)
    return (
      <Skeleton
        height={'44px'}
        width={'130px'}
        startColor='gray.900'
        endColor='gray.1000'
        className={clsx(
          'rounded',
          position === 'right' && 'ml-auto',
          position === 'left' && 'mr-auto',
          position === 'center' && 'mx-auto',
          className,
        )}
      />
    )

  return (
    <button
      type={type}
      className={clsx(
        'h-34 xl:h-44 lg:px-0 font-title text-12 xl:text-16 cursor-pointer flex items-center shrink-0',
        variant === 'primary'
          ? disabled
            ? 'bg-gray text-black'
            : 'bg-yellow hover:scale-105 transition hover:shadow-custom-yellow active:bg-darkYellow'
          : '',
        variant === 'secondary' && 'text-textGray  hover:text-white',
        position === 'right' && 'mx-auto md:mx-0 md:ml-auto',
        position === 'center' && 'mx-auto',
        position === 'left' && 'grow',
        isRounded
          ? 'rounded-md h-40 w-120 text-16'
          : 'grow sm:grow-0 w-100 lg:w-120',
        className,
      )}
      onClick={onClick && !disabled ? onClick : undefined}
    >
      {icon && (
        <img
          src={icon}
          alt='icon'
          className='mr-12 hover:scale-125 transition'
        />
      )}
      {link ? (
        <a href={link} className='block m-auto'>
          {title}
        </a>
      ) : (
        <span className={clsx(!icon && 'grow whitespace-nowrap')}>{title}</span>
      )}
    </button>
  )
}
