import React, { useEffect, useState } from 'react'
import {LuPlus} from 'react-icons/lu'
import {CARD_BG} from '../../utils/data.js'


const Dashboard = () => {
  const navigate = useNavigate()

  const [openCreateModal,setOpenCreateModal] = useState(false)
  const [sessions,setSessions] =useState([])

  const [opemDeleteAlert,setOpenDeleteAlert] = useState({
    open:false,
    data:null,
  })

  const fetchAllSession = async()=>{

  }
  const deleteSession = async() =>{

  }
  useEffect(()=>{
    fetchAllSession()
  },[])
  return (
    <DashboardLayout>Dashboard</DashboardLayout>
  )
}

export default Dashboard
