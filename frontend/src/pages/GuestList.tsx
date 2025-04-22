import { useState } from "react";
import { Guest } from "../App";

interface Props {
  guests: Guest[];
  onUpdate: () => void;
}

export default function GuestList({ guests, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", is_attending: false });

  const startEditing = (guest: Guest) => {
    setEditingId(guest.id);
    setFormData(guest);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", email: "", is_attending: false });
  };

  const saveEdit = async () => {
    await fetch(import.meta.env.VITE_API_BASE_URL + `/guests/${editingId}`, {
      method: "PUT", // you can switch to PATCH if preferred
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    cancelEdit();
    onUpdate();
  };

  const deleteGuest = async (id: number) => {
    if (!confirm("Delete this guest?")) return;
    await fetch(import.meta.env.VITE_API_BASE_URL + `/guests/${id}`, {
      method: "DELETE",
    });
    onUpdate();
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-6 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Guest List</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Attending</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              {editingId === guest.id ? (
                <>
                  <td className="p-2 border">
                    <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </td>
                  <td className="p-2 border">
                    <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </td>
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={formData.is_attending}
                      onChange={(e) => setFormData({ ...formData, is_attending: e.target.checked })}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <button onClick={saveEdit} className="text-green-600 mr-2">💾</button>
                    <button onClick={cancelEdit} className="text-gray-500">❌</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{guest.name}</td>
                  <td className="p-2 border">{guest.email}</td>
                  <td className="p-2 border text-center">{guest.is_attending ? "✅" : "❌"}</td>
                  <td className="p-2 border text-center">
                    <button onClick={() => startEditing(guest)} className="text-blue-600 mr-2">✏️</button>
                    <button onClick={() => deleteGuest(guest.id)} className="text-red-600">🗑️</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
