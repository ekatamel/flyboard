import logo from 'assets/images/logo-new.png'
import { Progress } from './Progress'
import { FormNavigationContext as VoucherPurchaseContext } from 'context/VoucherFormNavigationContext'
import { FormNavigationContext as ReservationContext } from 'context/ReservationFormNavigationContext'
import { useContext } from 'react'
import { Button } from 'components/shared/Button'
import arrowLeft from 'assets/images/arrow-left.svg'
import { useMediaQuery } from '@chakra-ui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { usePrompt } from 'hooks/usePrompt'

interface LayoutProps {
  stepName: string
  title: string
  leftPart?: React.ReactNode
  rightPart?: React.ReactNode
  bottomCenterPart?: React.ReactNode
  children?: React.ReactNode
  noNavigation?: boolean
  noPreviousNavigation?: boolean
  onPreviosStepClick?: () => void
  onNextStepClick?: () => void
  isLoading?: boolean
  isNextDisabled?: boolean
}

export const Layout = ({
  stepName,
  title,
  leftPart,
  rightPart,
  bottomCenterPart,
  children,
  noNavigation = false,
  noPreviousNavigation = false,
  onPreviosStepClick,
  onNextStepClick,
  isLoading,
  isNextDisabled,
}: LayoutProps) => {
  let location = useLocation()

  const Context =
    location.pathname === '/nakup-voucheru'
      ? VoucherPurchaseContext
      : ReservationContext

  const {
    totalSteps,
    currentStepIndex,
    previousStepIndex,
    goToNextStep,
    goToPreviousStep,
    isNextStepDisabled,
  } = useContext(Context)
  usePrompt(currentStepIndex + 1 === totalSteps)

  const isNavigatingBackwards = currentStepIndex < previousStepIndex

  const [isSmBreakpoint] = useMediaQuery('(min-width: 640px)')
  const [isMdBreakpoint] = useMediaQuery('(min-width: 768px)')

  const animationSettings = isNavigatingBackwards
    ? { initial: { x: -600, opacity: 0.7 }, exit: { x: 600, opacity: 0.7 } }
    : { initial: { x: 600, opacity: 0.7 }, exit: { x: -600, opacity: 0.7 } }

  const totalStepsNumber = location.pathname === '/success' ? 8 : 5

  return (
    <motion.div
      initial={animationSettings.initial}
      animate={{ x: 0, opacity: 1 }}
      exit={animationSettings.exit}
      transition={{ duration: 0.2 }}
    >
      <div className='app-container bg-black w-screen min-h-screen flex flex-col pt-0 2xl:pt-84 4xl:pt-200 3xl:items-center'>
        <header className='3xl:w-[1600px] 3xl:mx-0 2xl:mx-168 xl:px-127 px-20 flex justify-between mt-30 lg:mt-0'>
          <a href='https://www.flyboardshow.cz/' target='_blank'>
            <img src={logo} alt='Flyboard logo' className='h-70 lg:h-100' />
          </a>
          <div
            className={clsx(
              'justify-between items-center mb-10 flex sm:hidden',
              stepName === 'úvod' && 'hidden',
            )}
          >
            <Progress
              value={!stepName ? totalStepsNumber : currentStepIndex + 1}
              total={totalSteps || totalStepsNumber}
            />
          </div>
        </header>
        <main className='3xl:w-1000 3xl:mx-auto 2xl:mx-450 xl:mx-224 relative grow flex flex-col xl:block'>
          <div className='sm:mx-44 md:mx-100 xl:mx-0 justify-between items-center mb-10 hidden sm:flex'>
            {isLoading ? (
              <SkeletonText
                className='w-100'
                mt='4'
                noOfLines={1}
                spacing='4'
                skeletonHeight='4'
                startColor='gray.600'
                endColor='gray.1000'
              />
            ) : (
              <p className='text-yellow uppercase font-title text-base'>
                {stepName}
              </p>
            )}

            {isLoading ? (
              <SkeletonCircle
                size='10'
                startColor='gray.600'
                endColor='gray.1000'
              />
            ) : (
              <div className={clsx(stepName === 'úvod' && 'hidden')}>
                <Progress
                  value={!stepName ? totalStepsNumber : currentStepIndex + 1}
                  total={totalSteps || totalStepsNumber}
                />
              </div>
            )}
          </div>

          <div className='lg:flex lg:items-center lg:justify-between xl:grow mt-20 lg:mx-100 xl:mx-0 xl:mt-0'>
            <div className='xl:w-1/4 xl:block m-auto justify-center hidden lg:flex'>
              {leftPart}
            </div>

            {isLoading ? (
              <div className='w-full flex justify-center'>
                <SkeletonText
                  className='w-253'
                  mt='4'
                  noOfLines={1}
                  spacing='4'
                  skeletonHeight='10'
                  startColor='gray.600'
                  endColor='gray.1000'
                />
              </div>
            ) : (
              <h1 className='text-white uppercase font-title xl:text-52 text-center w-full text-30'>
                {title}
              </h1>
            )}

            <div className='xl:w-1/4 m-auto flex justify-center lg:invisible xl:hidden'>
              {leftPart}
            </div>

            <div className='lg:w-1/4 hidden xl:block'>{rightPart}</div>
          </div>

          {children}
        </main>
        <div
          className={clsx(
            'flex 3xl:w-1000 3xl:mx-auto 2xl:mx-450 xl:mx-224 sm:mx-44 md:mx-80 mx-20 m-auto flex-wrap md:flex-nowrap items-center lg:mt-40 xl:mt-0',
            isLoading && 'justify-between',
            !isSmBreakpoint &&
              (!noNavigation ? 'justify-between' : 'justify-center'),
          )}
        >
          {!isMdBreakpoint && bottomCenterPart && bottomCenterPart}
          {!noNavigation && !noPreviousNavigation && !!stepName && (
            <Button
              title='Zpět'
              variant='secondary'
              position='left'
              onClick={() =>
                onPreviosStepClick ? onPreviosStepClick() : goToPreviousStep()
              }
              icon={arrowLeft}
              isLoading={isLoading}
            />
          )}

          {isMdBreakpoint && bottomCenterPart && bottomCenterPart}

          {((!noNavigation && currentStepIndex < totalSteps - 1) ||
            onNextStepClick) && (
            <Button
              title={
                stepName === 'Shrnutí'
                  ? location.pathname === '/nakup-voucheru'
                    ? 'Dokončit a zaplatit'
                    : 'Dokončit'
                  : 'Další krok'
              }
              variant='primary'
              position='right'
              onClick={() =>
                onNextStepClick ? onNextStepClick() : goToNextStep()
              }
              disabled={isNextStepDisabled || isNextDisabled}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}
