import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import AppRouter from '@/pages/router'
import '@/styles/index.less'
export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AppRouter />
    </ConfigProvider>
  )
}
