import { motion } from 'framer-motion'
import { File } from 'assets/images/File'
import logo from 'assets/images/logo-new.svg'
import { useState } from 'react'
import clsx from 'clsx'
import { Reservations } from 'assets/images/Reservations'
import { Settings } from 'assets/images/Settings'
import { Link, useLocation } from 'react-router-dom'

export const Menu = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()

  const variants = {
    hidden: { width: '75px' },
    visible: { width: '250px' },
  }

  const menuConfig = [
    {
      title: 'Vouchery',
      icon: File,
      path: '/admin/vouchery',
    },
    {
      title: 'Rezervace',
      icon: Reservations,
      path: '/admin/rezervace',
    },
    {
      title: 'Nastavení',
      icon: Settings,
      path: '/admin/nastaveni',
    },
  ]

  return (
    <motion.div
      initial='hidden'
      variants={variants}
      whileHover='visible'
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      style={{
        // height: '100vh',
        overflow: 'hidden',
      }}
      className='bg-black border-r border-white shrink-0'
    >
      <a href='https://www.flyboardshow.cz/' target='_blank' rel='noreferrer'>
        <img src={logo} alt='Flyboard logo' className='pl-8 h-60 shrink-0' />
      </a>
      <div className='mt-100 px-16'>
        {menuConfig.map(menuItem => {
          const { path, icon: Icon, title } = menuItem
          const isSelected = path === location.pathname
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                'flex cursor-pointer h-40 px-8 py-12 items-center',
                isSelected && 'bg-yellow rounded',
              )}
            >
              <Icon
                stroke={isSelected ? '#000000' : '#ffea00'}
                className={'shrink-0 mr-20'}
              />

              <span
                className={clsx(
                  isExpanded ? 'inline' : 'hidden',
                  'font-title  text-20',
                  isSelected ? 'text-black' : 'text-yellow',
                )}
              >
                {title}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
