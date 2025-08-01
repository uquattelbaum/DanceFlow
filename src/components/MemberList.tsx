import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Member {
  id: string;
  vorname: string;
  nachname: string;
}

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        //.from<Member>('mitglieder')
        .from('mitglieder')
        .select('id, vorname, nachname')
        .eq('aktiv', true)
        .order('nachname');
      if (error) setError(error.message);
      else setMembers(data!);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <p>Lade Mitglieder…</p>;
  if (error) return <p className="text-red-500">Fehler: {error}</p>;

  return (
    <ul className="space-y-2">
      {members.map((m) => (
        <li key={m.id} className="p-4 bg-white rounded shadow">
          {m.vorname} {m.nachname}
        </li>
      ))}
    </ul>
  );
}