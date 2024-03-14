import { TabList } from 'components/shared/TabList'
import { AdminDiscounts } from './AdminDiscounts'
import { AdminLocations } from './AdminLocations'
import { AdminAvailability } from './AdminAvailability'

export const AdminSettings = () => {
  const tabListItems = [
    { id: 1, name: 'Slevové kódy', element: <AdminDiscounts /> },
    { id: 2, name: 'Lokace', element: <AdminLocations /> },
    { id: 3, name: 'Dostupnost', element: <AdminAvailability /> },
  ]

  return (
    <div className='w-full'>
      <h1 className='text-white font-title text-subtitle'>Nastavení</h1>
      <TabList items={tabListItems} selectedTabId={1} />
    </div>
  )
}
