import { useState } from "react";

interface Props {
  onRSVP: () => void;
}

export default function GuestForm({ onRSVP }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAttending, setIsAttending] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const guestData = {
      name,
      email,
      is_attending: isAttending,
    };

    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
      });

      if (!res.ok) throw new Error("RSVP failed");

      alert("RSVP submitted!");
      setName("");
      setEmail("");
      setIsAttending(true);

      onRSVP(); // ⬅️ trigger refresh!
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow-xl bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">RSVP Form</h2>
      <input
        type="text"
        placeholder="Name"
        className="border w-full p-2 mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border w-full p-2 mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={isAttending}
          onChange={(e) => setIsAttending(e.target.checked)}
          className="mr-2"
        />
        Attending?
      </label>
      <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white w-full p-2 rounded">
        Submit RSVP
      </button>
    </form>
  );
}

