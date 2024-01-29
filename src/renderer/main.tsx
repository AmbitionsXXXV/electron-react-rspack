import { StyleProvider } from '@ant-design/cssinjs'
import { App as AntApp, ConfigProvider } from 'antd'
import { ThemeProvider } from 'antd-style'
import { MessageInstance } from 'antd/es/message/interface'
import { ModalStaticFunctions } from 'antd/es/modal/confirm'
import { NotificationInstance } from 'antd/es/notification/interface'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { createRoot } from 'react-dom/client'
import App from './app'
import './global.css'

dayjs.locale('zh-cn')

export let message: MessageInstance
export let notification: NotificationInstance
export let modal: Omit<ModalStaticFunctions, 'warn'>

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <StyleProvider hashPriority="high">
    <ConfigProvider locale={zhCN}>
      <ThemeProvider
        getStaticInstance={(instances) => {
          modal = instances.modal
          message = instances.message
          notification = instances.notification
        }}
      >
        <AntApp>
          <App />
        </AntApp>
      </ThemeProvider>
    </ConfigProvider>
  </StyleProvider>
)
