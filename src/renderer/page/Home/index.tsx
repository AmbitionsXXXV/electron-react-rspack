import LogCard from '@/renderer/components/LogCard'
import ToggleUpdate from '@/renderer/components/ToggleUpdate'
import {
  curTimeAtom,
  isUpdatingAtom,
  pythonOutPutAtom,
  versionAtom
} from '@/renderer/store'
import { MinusCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Space, Spin, Tag, Typography } from 'antd'
import { message } from 'antd/lib'
import dayjs from 'dayjs'
import { useRequest } from 'etc-hooks'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, type FC } from 'react'

const { Text } = Typography

const Home: FC = () => {
  const { coreVersionStatus = false } = useAtomValue(versionAtom) ?? {}
  const [curTime, setCurTime] = useAtom(curTimeAtom)
  const [isUpdating, setIsUpdating] = useAtom(isUpdatingAtom)
  const pythonOutput = useAtomValue(pythonOutPutAtom)

  const { run } = useRequest(
    async () => await window.electronAPI.getCoreAndClientVersion(),
    {
      manual: true
    }
  )

  const { data: pending = false, cancel } = useRequest(
    async (): Promise<boolean> =>
      (await window.electronAPI.checkCoreUpdateLockFile()).pending,
    {
      pollingInterval: 500
    }
  )

  const handleTimeTask = async (isPause: boolean) => {
    setCurTime(new Date())
    window.electronAPI.toggleHandler(!isPause)
    setIsUpdating(!isPause)
    isPause ? message.success('自动更新暂停成功') : message.info('开始执行自动更新')
  }

  useEffect(() => {
    if (!pending) {
      cancel()
    }
  }, [pending])

  return (
    <>
      {pending && (
        <Space className="gap-5 h-[300px] w-full flex-col justify-center items-center">
          <Spin size="large" tip="内核更新中...">
            <div />
          </Spin>
        </Space>
      )}

      {!pending && (
        <Space className="gap-5 h-[300px] w-full flex-col justify-center items-center">
          {coreVersionStatus ? (
            <>
              <div className="text-xl">
                运行状态:{' '}
                {isUpdating ? (
                  <Tag
                    className="text-xl"
                    icon={<SyncOutlined spin />}
                    color="processing"
                  >
                    运行中
                  </Tag>
                ) : (
                  <Tag className="text-xl" icon={<MinusCircleOutlined />} color="default">
                    已暂停
                  </Tag>
                )}
              </div>

              <ToggleUpdate handleTimeTask={handleTimeTask} />
            </>
          ) : (
            <>
              <Button onClick={run}>初始化系统</Button>
            </>
          )}

          {curTime && (
            <Text type="secondary">
              {`${isUpdating ? '启动时间：' : '暂停时间：'}`}
              {`${dayjs(curTime).format('YYYY-MM-DD HH:mm:ss')}`}
            </Text>
          )}
        </Space>
      )}

      <LogCard outputStream={pythonOutput} />
    </>
  )
}

export default Home
