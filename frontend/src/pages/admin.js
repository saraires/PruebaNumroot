import React from "react";
import Navbar from "../components/navbar";
import Table from "../components/table";


const Admin = () => {
    return (
        <>
            <Navbar isAdmin={true} />
            <Table isAdmin={true} />
        </>
    )
}

export default Admin;