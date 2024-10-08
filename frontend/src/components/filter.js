import React, { useState } from "react";

const Filter = ({ data, setFilteredData }) => {

    const [filter, setFilter] = useState("");

    const handleFilteredData = (e) => {
        const filterValue = e.target.value.toLowerCase()
        setFilter(filterValue);

        if (filterValue === "") {
            setFilteredData(data)
        } else {
            const filterInput = data.filter((item) => {
                return Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(filter.toLowerCase()));
            });

            setFilteredData(filterInput)
        }
    }


    return (
        <input
            type="text"
            className="form-control mb-4"
            placeholder="Filtrar usuarios"
            value={filter}
            onChange={handleFilteredData}
        />
    )
}

export default Filter;