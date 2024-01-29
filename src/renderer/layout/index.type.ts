import { ModalProps } from 'antd'

export type IChangeLodModalProps = ModalProps

export interface ISiderMenuProps {
  collapsed: boolean
  activeKey: string[]
}

export interface IToggleIsUpdatingProps {
  handleTimeTask: (isPause: boolean) => Promise<void>
}
