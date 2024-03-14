import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Success } from 'components/voucher-purchase/Success'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'styles/theme'
import { VoucherPurchaseForm } from 'components/voucher-purchase-form/VoucherPuchaseForm'
import { LessonReservationForm } from 'components/reservations/LessonReservationForm'
import { Discounts } from 'components/admin/Discounts'
import { Reservations } from 'components/admin/Reservations'
import { Timeslots } from 'components/admin/Timeslots'
import { Vouchers } from 'components/admin/Vouchers'
import { Admin } from 'components/admin/Admin'
import { AdminVouchers } from 'components/admin/AdminVouchers'
import { AdminReservations } from 'components/admin/AdminReservations'
import { AdminSettings } from 'components/admin/AdminSettings'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/success',
    element: <Success />,
  },
  {
    path: '/nakup-voucheru',
    element: <VoucherPurchaseForm />,
  },
  {
    path: '/rezervace',
    element: <LessonReservationForm />,
  },
  {
    path: '/discounts',
    element: <Discounts />,
  },
  {
    path: '/reservations',
    element: <Reservations />,
  },
  {
    path: '/timeslots',
    element: <Timeslots />,
  },
  {
    path: '/vouchers',
    element: <Vouchers />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      { path: 'vouchery', element: <AdminVouchers /> },
      { path: 'rezervace', element: <AdminReservations /> },
      { path: 'nastaveni', element: <AdminSettings /> },
    ],
  },
])

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
