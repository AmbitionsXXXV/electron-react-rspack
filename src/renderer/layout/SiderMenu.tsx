import { RobotOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ISiderMenuProps } from './index.type'
import { useSiderMenuStyle } from './sidermenu.style'

const { Sider } = Layout

const SiderMenu: FC<ISiderMenuProps> = ({ collapsed, activeKey }) => {
  const navigate = useNavigate()
  const { styles } = useSiderMenuStyle()

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Sider className="w-full" trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        onClick={onMenuClick}
        className={styles.root}
        selectedKeys={activeKey}
        items={[
          {
            key: '/',
            icon: <RobotOutlined />,
            label: '启动自动更新'
          },
        ]}
      />
    </Sider>
  )
}

export default SiderMenu
