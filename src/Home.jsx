import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {


  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("persons"));

  // Agar localStorage empty hai to default 2 users add karo
  if (!stored || stored.length === 0) {
    const defaultUsers = [
      {
        id: 1,
        name: "Rahul",
        email: "rahul@gmail.com",
      },
      {
        id: 2,
        name: "Amit",
        email: "amit@gmail.com",
      },
    ];

    localStorage.setItem("persons", JSON.stringify(defaultUsers));
    setData(defaultUsers);
  } else {
    setData(stored);
  }
}, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("persons")) || [];
    setData(stored);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      const updated = data.filter((d) => d.id !== id);
      setData(updated);
      localStorage.setItem("persons", JSON.stringify(updated));
    }
  };

return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12 px-4">
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          User Management
        </h2>

        <Link
          to="/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Add User
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="px-4 text-left">Name</th>
            <th className="px-4 text-left">Email</th>
            <th className="px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr
              key={d.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{d.id}</td>
              <td className="px-4">{d.name}</td>
              <td className="px-4">{d.email}</td>
              <td className="px-4 text-center space-x-2">
                <Link
                  to={`/update/${d.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                 🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
);
}

export default Home;