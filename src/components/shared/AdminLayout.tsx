import { Menu } from './Menu'

interface AdminLayoutProps {
  children: React.ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className='bg-black w-screen min-h-screen flex'>
      <Menu />
      <div className='py-40 px-28 w-full'>{children}</div>
    </div>
  )
}
