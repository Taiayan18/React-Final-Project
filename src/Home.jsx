import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/persons")
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const heandleDelet = (id) => {
    const confirm = window.confirm("Would You Like To Delete?");

    if (confirm) {
      axios
        .delete(`http://localhost:3000/persons/${id}`)
        .then(() => {
          // state se remove karo
          setdata(data.filter((user) => user.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of User</h1>

      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>

        <table className="table table-stiped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                
                <td>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => heandleDelet(d.id)}
                    className="btn btn-sm btn-danger"
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
};

export default Home;
