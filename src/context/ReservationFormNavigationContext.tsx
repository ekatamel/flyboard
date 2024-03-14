import React, { createContext, useState } from 'react'

import { VoucherCodes } from 'components/reservations/VoucherCodes'
import { DateLocationSelector } from 'components/reservations/DateLocationSelector'
import { ReservationContacts } from 'components/reservations/ReservationContacts'
import { ReservationSummary } from 'components/reservations/ReservationSummary'
import { ReservationSuccess } from 'components/reservations/ReservationSuccess'

export interface FormNavigationContextType {
  currentStepIndex: number
  previousStepIndex: number
  goToNextStep: () => void
  goToPreviousStep: () => void
  isNextStepDisabled: boolean
  setIsNextStepDisabled: (isNextStepDisabled: boolean) => void
  formSteps: React.ReactNode[]
  totalSteps: number
}

export const FormNavigationContext = createContext<FormNavigationContextType>({
  currentStepIndex: 0,
  previousStepIndex: 0,
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  isNextStepDisabled: false,
  setIsNextStepDisabled: () => {},
  formSteps: [],
  totalSteps: 0,
})

interface FormNavigationProviderProps {
  children: React.ReactNode
}

export function FormNavigationProvider({
  children,
}: FormNavigationProviderProps) {
  const formSteps = [
    <VoucherCodes />,
    <DateLocationSelector />,
    <ReservationContacts />,
    <ReservationSummary />,
    <ReservationSuccess />,
  ]

  const [previousStepIndex, setPreviousStepIndex] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isNextStepDisabled, setIsNextStepDisabled] = useState(false)

  const goToNextStep = () => {
    if (!isNextStepDisabled) {
      setPreviousStepIndex(currentStepIndex)
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const goToPreviousStep = () => {
    setPreviousStepIndex(currentStepIndex)
    setCurrentStepIndex(currentStepIndex - 1)
  }

  return (
    <FormNavigationContext.Provider
      value={{
        currentStepIndex,
        previousStepIndex,
        goToNextStep,
        goToPreviousStep,
        isNextStepDisabled,
        setIsNextStepDisabled,
        formSteps,
        totalSteps: formSteps.length,
      }}
    >
      {children}
    </FormNavigationContext.Provider>
  )
}
