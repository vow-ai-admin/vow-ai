import { useEffect, useState } from "react";
import VowGenerator from "./pages/VowGenerator";
import GuestForm from "./pages/GuestForm";
import GuestList from "./pages/GuestList";

export interface Guest {
  id: number;
  name: string;
  email: string;
  is_attending: boolean;
}

function App() {
  const [guests, setGuests] = useState<Guest[]>([]);

  const fetchGuests = async () => {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/guests");
    const data = await res.json();
    setGuests(data);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Vow AI 💍</h1>
      <VowGenerator />
      <GuestForm onRSVP={fetchGuests} />
      <GuestList guests={guests} onUpdate={fetchGuests} />
    </div>
  );
}

export default App;
