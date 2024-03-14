import clsx from 'clsx'
import { useState } from 'react'

interface TabListProps {
  selectedTabId: number
  items: { id: number; name: string; element?: JSX.Element }[]
  className?: string
  setSelectedId?: (id: number) => void
}

export const TabList = ({
  items,
  selectedTabId,
  className,
  setSelectedId,
}: TabListProps) => {
  const [tabIdSelected, setTabIdSelected] = useState(selectedTabId)

  return (
    <>
      <div className={clsx('flex gap-4 mb-40', className)}>
        {items.map(item => {
          return (
            <div
              key={item.id}
              className={clsx(
                'font-title text-14 h-40 w-70 text-center cursor-pointer',
                item.id === tabIdSelected
                  ? 'text-black bg-yellow border-b-2 border-white'
                  : 'text-yellow bg-black',
              )}
              onClick={() => {
                setTabIdSelected(item.id)
                setSelectedId && setSelectedId(item.id)
              }}
            >
              {item.name}
            </div>
          )
        })}
      </div>
      <div>{items.find(item => item.id === tabIdSelected)?.element}</div>
    </>
  )
}
