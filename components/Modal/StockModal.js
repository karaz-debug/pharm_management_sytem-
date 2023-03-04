

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/styles';
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 8,
};

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },

    formControl: {
        marginTop: 2,
        width: '100%',
        minWidth: 150,
    },
    formControlLabel: {
        marginTop: 1,

    },

    button: {
        marginTop: 4,
        backgroundColor: '#00bcd4',
        '&:hover': {
            backgroundColor: '#ffa500',
        },
        border: '1px solid #00bcd4',
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#00bcd4',
        },
    },
}));

function StockModal({ isOpen, onClose, selectedStock }) {

    const [stock, setStock] = useState({});


    useEffect(() => {
        if (selectedStock) {
            setStock({
                ExpiryDate: selectedStock.ExpiryDate || '',
                PurchasePrice: selectedStock.PurchasePrice || '',
                ReceivedBy: selectedStock.ReceivedBy || '',
                Location: selectedStock.Location || '',
                ReceivedDate: selectedStock.ReceivedDate || '',
                Description: selectedStock.Description || '',
                Supplier: selectedStock.Supplier || '',
            });
        } else {
            setStock({
                ExpiryDate: '',
                PurchasePrice: '',
                ReceivedBy: '',
                Location: '',
                ReceivedDate: '',
                Description: '',
                Supplier: '',
            });
        }
    }, [selectedStock]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setStock({
            ...stock,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            let method;
            let url;
            if (selectedStock) {
                method = 'PUT';
                url = `http://localhost:3001/admin/stock/${selectedStock._id}`;
            } else {
                method = 'POST';
                url = 'http://localhost:3001/admin/stock';
            }
            response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(stock),
            });
            const data = await response.json();
            console.log(data);
            onClose(false);
        } catch (err) {
            console.error(err);
        }
    };



    return (
        <div className="mt-10">
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className={useStyles.form} onSubmit={handleSubmit}>
                        <InputLabel htmlFor="profile-picture-input">Expiry Date</InputLabel>
                        <TextField
                            margin="dense"
                            id="ExpiryDate"
                            name="ExpiryDate"
                            type="date"
                            fullWidth
                            onChange={handleChange}
                            value={stock.ExpiryDate}
                        />

                        <InputLabel htmlFor="profile-picture-input">Recieved Date</InputLabel>
                        <TextField
                            margin="dense"
                            id="ReceivedDate"
                            name="ReceivedDate"
                            type="date"
                            fullWidth
                            onChange={handleChange}
                            value={stock.ReceivedDate}
                        />

                        <TextField
                            margin="dense"
                            id="ReceivedBy"
                            name="ReceivedBy"
                            label="Received By"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={stock.ReceivedBy}
                        />

                        <TextField
                            margin="dense"
                            id="PurchasePrice"
                            name="PurchasePrice"
                            type="number"
                            label="PurchasePrice"
                            fullWidth
                            onChange={handleChange}
                            value={stock.PurchasePrice}
                        />
                        <TextField
                            margin="dense"
                            id="Location"
                            name="Location"
                            label="Location Stored"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={stock.Location}
                        />



                        <TextField
                            autoFocus
                            margin="dense"
                            id="Description"
                            name="Description"
                            label="Description"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={stock.Description}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="Supplier"
                            name="Supplier"
                            label="Supplier"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={stock.Supplier}
                        />

                        {/* <FormControl sx={{ mt: 2, minWidth: 250 }} size="small" className={useStyles.formControl}>
                            <InputLabel id="demo-select-small">Supplier</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={stock.supplier}
                                name="supplier"
                                label="supplier"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={stock.supplier}>Ahmed</MenuItem>
                                <MenuItem value={stock.supplier}>ALi Baba</MenuItem>
                                <MenuItem value={stock.supplier}>Charpie Chablin</MenuItem>
                            </Select>
                        </FormControl> */}

                    </form>

                    <div className="flex gap-20 mt-4">
                        <div>
                            <Button onClick={onClose} className={useStyles.button} color="primary" >
                                Cancel
                            </Button>
                        </div>
                        <div>
                            <Button type="submit" onClick={handleSubmit} className={useStyles.button} color="primary">
                                {selectedStock ? ' Edit' : 'Add'}
                            </Button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default StockModal;
