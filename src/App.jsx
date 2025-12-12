import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Private/Dashboard'
import Books from './pages/Private/Books'
import Users from './pages/Private/Users'
import Orders from './pages/Private/Orders'
import Analytics from './pages/Private/Analytics'
import Notifications from './pages/Private/Notifications'
import Messages from './pages/Private/Messages'
import SettingsPage from './pages/Private/Settings'
import Help from './pages/Private/Help'
import { SignIn } from './components/auth/SignIn'
import Private from './pages/Private/private'
import UserView from './pages/Private/UserView'
import BorrowedBooks from './pages/Private/BorrowedBooks'
import CurrentUserProfile from './pages/Private/CurrentUserProfile'
import { LiberianBoard } from './pages/Private/LiberianBoard'
import { SignUp } from './components/auth/SignUp'
import BookDetail from './pages/Private/BookDetail'

function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      
      <Route path='/' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      
      {/* Routes privées avec protection et layout */}
      <Route path='/private' element={<Private />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="book/:id" element={<BookDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<Help />} />
        <Route path="user-view" element={<UserView />} />
        <Route path="my-borrows" element={<BorrowedBooks />} />
        <Route path="current-profile" element={<CurrentUserProfile />} />
        <Route path="librarian-dashboard" element={<LiberianBoard />} />
      </Route>
      
      {/* Route 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App