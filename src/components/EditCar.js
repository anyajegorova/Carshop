import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

function EditCar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

    const handleClickOpen = () => {
        console.log(props.row);
        setCar({
            model: props.row.data.model,
            brand: props.row.data.brand,
            color: props.row.data.color,
            fuel: props.row.data.fuel,
            year: props.row.data.year,
            price: props.row.data.price,


        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const inputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };
    const handleSave = () => {
        props.editCar(props.row.value, car);
        handleClose();
    };

    return (
        <div>
            <Stack direction="row" spacing={1}><IconButton aria-label="delete" color="primary" size="small" onClick={handleClickOpen}><EditIcon /></IconButton></Stack>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={inputChanged}
                        label="Brand"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={inputChanged}
                        label="Model"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={inputChanged}
                        label="Color"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={inputChanged}
                        label="Fuel"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        onChange={inputChanged}
                        label="Year"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={inputChanged}
                        label="Price"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCar;