import { supabase } from '../supabaseClient'

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload() // Damit App den Login-Zustand neu prüft
  }

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  )
}
