import { unstable_usePrompt } from 'react-router-dom'

export const usePrompt = (isLastStep?: boolean) => {
  return unstable_usePrompt({
    message:
      'Jste si jisti, že chcete opustit stránku? Všechny změny budou ztraceny.',
    when: ({ currentLocation, nextLocation }) => {
      if (isLastStep) return false

      return (
        currentLocation.pathname !== '/' &&
        currentLocation.pathname !== nextLocation.pathname
      )
    },
  })
}
