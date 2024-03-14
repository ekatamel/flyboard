import { AdminLayout } from 'components/shared/AdminLayout'
import { Outlet } from 'react-router-dom'

export const Admin = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
