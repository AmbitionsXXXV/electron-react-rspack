import { type FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from '@/renderer/page/Home'

const App: FC = () => {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
  )
}

export default App
