import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HotelListPage from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import TestPage from '@pages/Test'
import SigninPage from '@pages/Signin'
import MyPage from '@pages/My'
import SchedulePage from '@pages/Schedule'
import ReservationPage from '@pages/Reservation'
import SettingsPage from '@pages/settings/index'
import LikesPage from '@pages/settings/likes'

import Navbar from '@shared/Navbar'
import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from '@components/auth/PrivateRoute'

import useLoadKakao from '@hooks/useLoadKakao'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/" element={<HotelListPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/likes"
            element={
              <PrivateRoute>
                <LikesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation"
            element={
              <PrivateRoute>
                <ReservationPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
