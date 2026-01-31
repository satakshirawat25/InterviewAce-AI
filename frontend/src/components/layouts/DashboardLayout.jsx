import {  useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({Children})=>{
    const {user}=useContext(UserContext)
    return(
        <div>
            <Navbar/>
            {user && <div>{Children}</div>}
        </div>
    )
}

export default DashboardLayout