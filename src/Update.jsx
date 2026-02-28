import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem("persons")) || [];
    const user = oldData.find((d) => d.id == id);
    if (user) {
      setValue(user);
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("persons")) || [];

    const updated = oldData.map((d) =>
      d.id == id ? value : d
    );

    localStorage.setItem("persons", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update User
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <div>
            <label className="block mb-1 text-gray-600">Name</label>
            <input
              type="text"
              value={value.name}
              onChange={(e) =>
                setValue({ ...value, name: e.target.value })
              }
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={value.email}
              onChange={(e) =>
                setValue({ ...value, email: e.target.value })
              }
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
          >
            Update
          </button>

          <Link
            to="/"
            className="block text-center text-sm text-gray-500 mt-3 hover:underline"
          >
            Back
          </Link>

        </form>

      </div>
    </div>
  );
}

export default Update;