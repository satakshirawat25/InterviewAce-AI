import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = ({setCurrentPage}) => {
    const [profilePic,setProfilePic] = useState(null)
    const [fullName,setFullName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)

    const navigate = useNavigate()

    //handle signup form
    const handleSignUp = async(e)=>{
        e.preventDefault()
    }

  return (
    <div className=''>
     <h3 className="">Create an Account</h3>
     <p className="">Join usToday by entering your details below</p>
    </div>
  )
}

export default SignUp
