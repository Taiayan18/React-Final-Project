import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Create = () => {

    const [value,setvalue]=useState({
        name :'',
        email :'',
        age : ''
    })

    const navidate = useNavigate()


    const handleSubmit = (event) =>{
        event.preventDefault();
         axios.post("http://localhost:3000/persons",value)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
            navidate ('/')
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h1>Add a User</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor="name">Name:</label>
                    <input type="text"  name='name' className='form-control' placeholder='Enter name'
                    onChange={e => setvalue({...value, name : e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="email">Email:</label>
                    <input type="email"  name='email' className='form-control' placeholder='Enter Email'
                    onChange={e => setvalue({...value, email : e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="age">Age:</label>
                    <input type="age"  name='age' className='form-control' placeholder='Enter age'/>
                </div>

                <button className='btn btn-success'>Submit</button>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </form>
        </div>

    </div>
  )
}

export default Create