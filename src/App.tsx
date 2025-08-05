import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './components/Login'
import MemberList from './components/MemberList'
import LogoutButton from './components/LogoutButton'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    // Session beim Start prüfen
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
    })

    // Session-Änderungen (Login/Logout) live verfolgen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Optional: Ladeanzeige
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-gray-300 p-6 flex items-center justify-center">
        <p className="text-lg">Lade...</p>
      </div>
    )
  }

  // Wenn nicht eingeloggt → Login anzeigen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-300 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Admin Login</h1>
        <Login />
      </div>
    )
  }

  // Wenn eingeloggt → Mitgliederliste + Logout-Button anzeigen
  return (
    <div className="min-h-screen bg-gray-300 p-6 relative">
      <LogoutButton />
      <h1 className="text-3xl font-bold text-center mb-4">Mitglieder</h1>
      <MemberList />
    </div>
  )
}
