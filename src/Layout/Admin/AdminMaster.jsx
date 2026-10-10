import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

export default function AdminMaster(){
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>      
        </>
    )
}