import React from "react";
import InformationForm from "../components/informationForm";
import Table from "../components/table";
import Navbar from "../components/navbar";

const Home = () => {
    return (
        <div>
            <Navbar isAdmin={false}/>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-9">
                        <Table />
                    </div>
                    <div className="col-md-3">
                        <InformationForm />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;