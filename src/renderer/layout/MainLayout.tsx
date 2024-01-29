import CollapsedButton from '@/renderer/components/CollapsedButton'
import SiderMenu from '@/renderer/layout/SiderMenu'
import { Layout, Space, theme } from 'antd'
import { FC, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const { Header, Content } = Layout

const MainLayout: FC = () => {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [activeKey] = useState([pathname])

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout
      style={{
        height: '100vh',
        width: '100vw'
      }}
    >
      <SiderMenu collapsed={collapsed} activeKey={activeKey} />

      <Layout className="h-full">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: '1px solid #eee'
          }}
        >
          <Space className="justify-between w-full">
            <CollapsedButton collapsed={collapsed} setCollapsed={setCollapsed} />

          </Space>
        </Header>

        <Content className="overflow-y-scroll p-8 h-full">
          <Outlet />
        </Content>

      </Layout>
    </Layout>
  )
}

export default MainLayout
