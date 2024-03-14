import React, { createContext, useState } from 'react'
import { Lessons } from 'components/voucher-purchase/Lessons'
import { VoucherName } from 'components/voucher-purchase/VoucherName'
import { Contact } from 'components/voucher-purchase/Contact'
import { Summary } from 'components/voucher-purchase/Summary'
import { Payment } from 'components/voucher-purchase/Payment'
import { Extras } from 'components/voucher-purchase/Extras'
import { Merch } from 'components/voucher-purchase/Merch'

import { Success } from 'components/voucher-purchase/Success'

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
    <Lessons />,
    <VoucherName />,
    <Contact />,
    <Extras />,
    <Merch />,
    <Summary />,
    <Payment />,
    <Success />,
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
