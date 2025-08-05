import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import MemberList from './components/MemberList'
import Login from './components/Login'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    // Session initial prüfen
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
    })

    // Live-Updates bei Login/Logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (isLoggedIn === null) {
    return <div className="p-6 text-center">Lade...</div> // Initialer Ladezustand
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-300 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Admin Login</h1>
        <Login />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Mitglieder</h1>
      <MemberList />
    </div>
  )
}
