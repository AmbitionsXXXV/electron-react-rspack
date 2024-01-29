import { createStyles } from 'antd-style'

export const useSiderMenuStyle = createStyles(({ prefixCls, css }) => ({
  root: css`
    .${prefixCls} {
      &-menu-item {
        &-divider {
          border-color: rgb(255 255 255 / 20%);
        }
      }
    }
  `
}))
