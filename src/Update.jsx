import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setvalue] = useState({
    name: '',
    email: ''
  });

  // 🔹 Old data fetch karega
  useEffect(() => {
    axios.get(`http://localhost:3000/persons/${id}`)
      .then(res => {
        setvalue(res.data)   // 👈 yaha old data set ho raha hai
      })
      .catch(err => console.log(err))
  }, [id]);

  // 🔹 Update function
  const handleUpdate = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:3000/persons/${id}`, value)
      .then(res => {
        navigate('/')   // 👈 update hone ke baad home
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update a User</h1>

        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={value.name}
              onChange={e => setvalue({ ...value, name: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={value.email}
              onChange={e => setvalue({ ...value, email: e.target.value })}
            />
          </div>

          <button className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>

      </div>
    </div>
  );
};

export default Update;