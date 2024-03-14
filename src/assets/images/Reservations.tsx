interface IconProps {
  stroke: string
  className?: string
}

export const Reservations = ({ stroke, className }: IconProps) => {
  return (
    <svg
      width='24'
      height='26'
      viewBox='0 0 24 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_496_5796)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V21.5C21 22.3284 20.3284 23 19.5 23H4.5C3.67157 23 3 22.3284 3 21.5V6.5ZM19.5 6.5H4.5V21.5H19.5V6.5Z'
          fill={stroke}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M16.5 3.5C16.9142 3.5 17.25 3.83579 17.25 4.25V7.25C17.25 7.66421 16.9142 8 16.5 8C16.0858 8 15.75 7.66421 15.75 7.25V4.25C15.75 3.83579 16.0858 3.5 16.5 3.5Z'
          fill={stroke}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.5 3.5C7.91421 3.5 8.25 3.83579 8.25 4.25V7.25C8.25 7.66421 7.91421 8 7.5 8C7.08579 8 6.75 7.66421 6.75 7.25V4.25C6.75 3.83579 7.08579 3.5 7.5 3.5Z'
          fill={stroke}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3 10.25C3 9.83579 3.33579 9.5 3.75 9.5H20.25C20.6642 9.5 21 9.83579 21 10.25C21 10.6642 20.6642 11 20.25 11H3.75C3.33579 11 3 10.6642 3 10.25Z'
          fill={stroke}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M15.9209 13.4857C16.2049 13.7872 16.1908 14.2618 15.8893 14.5459L11.5112 18.6709C11.2216 18.9437 10.7694 18.9429 10.4807 18.6691L8.10884 16.4191C7.80832 16.1341 7.79581 15.6593 8.08088 15.3588C8.36595 15.0583 8.84066 15.0458 9.14117 15.3309L10.9986 17.0929L14.8607 13.4541C15.1622 13.1701 15.6368 13.1842 15.9209 13.4857Z'
          fill={stroke}
        />
      </g>
      <defs>
        <clipPath id='clip0_496_5796'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}
