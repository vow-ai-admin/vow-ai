import { useState } from "react";

export default function VowGenerator() {
  const [partnerName, setPartnerName] = useState("");
  const [tone, setTone] = useState("romantic");
  const [vow, setVow] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVow = async () => {
    setLoading(true);
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/vows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partner_name: partnerName, tone }),
    });
    const data = await res.json();
    setVow(data.message);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-xl rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4">AI Vow Generator</h2>
      <input
        type="text"
        placeholder="Partner's Name"
        className="border w-full p-2 mb-2"
        value={partnerName}
        onChange={(e) => setPartnerName(e.target.value)}
      />
      <select
        className="border w-full p-2 mb-2"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="romantic">Romantic</option>
        <option value="poetic">Poetic</option>
        <option value="funny">Funny</option>
      </select>
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white w-full p-2 rounded"
        onClick={generateVow}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Vow"}
      </button>

      {vow && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <strong>Your AI-Generated Vow:</strong>
          <p className="mt-2 italic">{vow}</p>
        </div>
      )}
    </div>
  );
}
