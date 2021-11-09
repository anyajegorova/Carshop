import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCar from "./AddCar";
import EditCar from "./EditCar";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");


    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err))
    }

    const deleteCar = url => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpen(true);
                        fetchCars();
                        setMsg("Deleted successfully")
                    } else {
                        setMsg("Something went wrong")
                    }
                })
                .catch(err => console.error(err));
        }
    };

    const addCar = car => {
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => fetchCars(),
                setOpen(true),
                setMsg("Added successfully"))
            .catch(err => console.error(err));
    }

    const editCar = (link, updatedCar) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedCar),
        })
            .then(response => fetchCars(),
                setOpen(true),
                setMsg("Car updated successfully"))
            .catch(err => console.error(err))
    }

    const columns = [
        { field: 'brand', sortable: true, filter: true },
        { field: 'model', sortable: true, filter: true },
        { field: 'color', sortable: true, filter: true },
        { field: 'fuel', sortable: true, filter: true },
        { field: 'year', width: 120, sortable: true, filter: true },
        { field: 'price', width: 100, sortable: true, filter: true },
        {
            headerName: "",
            width: 100,
            field: '_links.self.href',
            cellRendererFramework: params => (
                <EditCar editCar={editCar} row={params} />
            )


        },
        {
            headerName: "",
            width: 100,
            field: '_links.self.href',
            cellRendererFramework: params => <Stack direction="row" spacing={1}><IconButton aria-label="delete" color="error" size="small" onClick={() => deleteCar(params.value)}><DeleteIcon /></IconButton></Stack>
        }
    ]
    return (<div>
        <AddCar addCar={addCar} />
        <div className="ag-theme-material" style={{ marginTop: 10, height: 600, width: '93%', margin: 'auto' }}>

            <AgGridReact
                rowData={cars}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
        <Snackbar
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={handleClose}
        />
    </div>
    )
}

export default Carlist;