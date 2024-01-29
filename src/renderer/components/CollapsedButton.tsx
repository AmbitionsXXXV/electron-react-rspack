import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC, SetStateAction } from 'react'

interface ICollapsedButtonProps {
  collapsed: boolean
  setCollapsed: (value: SetStateAction<boolean>) => void
}

const CollapsedButton: FC<ICollapsedButtonProps> = ({ collapsed, setCollapsed }) => {
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64
      }}
    />
  )
}

export default CollapsedButton
