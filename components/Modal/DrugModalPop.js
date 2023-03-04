import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
        marginTop: 8,
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

function DrugModalPop({ isOpen, onClose, selectedDrug }) {

    const classes = useStyles();

    const [drug, setDrug] = useState({
        name: '',
        dosage: '',
        quantity: '',
        manufucture: '',
        category: ''
    });



    useEffect(() => {
        if (selectedDrug) {
            setDrug({
                name: selectedDrug.name || '',
                dosage: selectedDrug.dosage || '',
                quantity: selectedDrug.quantity || '',
                manufucture: selectedDrug.manufucture || '',
                category: selectedDrug.category || '',
            });
        } else {
            setDrug({
                name: '',
                dosage: '',
                quantity: '',
                category: '',
                manufucture: ''
            });
        }
    }, [selectedDrug]);


    const handleChange = (event) => {
        setDrug({ ...drug, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            let method;
            let url;
            if (selectedDrug) {
                method = 'PUT';
                url = `http://localhost:3001/admin/drug/${selectedDrug._id}`;
            } else {
                method = 'POST';
                url = 'http://localhost:3001/admin/drug';
            }
            response = await fetch(url, {
                method,

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(drug),
            });
            const data = await response.json();
            console.log(data);
            onClose(false);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className={useStyles.form} onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Drug Name"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={drug.name}
                        />
                        <TextField
                            margin="dense"
                            id="dosage"
                            name="dosage"
                            label="Dosage"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={drug.dosage}
                        />
                        <TextField
                            margin="dense"
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                            value={drug.quantity}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="manufucture"
                            name="manufucture"
                            label="Manufucture "
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={drug.manufucture}
                        />

                        <FormControl sx={{ mt: 2, minWidth: 250 }} size="small" className={useStyles.formControl}>
                            <InputLabel id="demo-select-small">Category</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={drug.category}
                                name="category"
                                label="category"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>

                    </form>

                    <div className="flex gap-20 mt-4">
                        <div>
                            <Button onClick={onClose} className={useStyles.button} color="primary" >
                                Cancel
                            </Button>
                        </div>
                        <div>
                            <Button type="submit" onClick={handleSubmit} className={useStyles.button} color="primary">
                                {selectedDrug ? ' Edit' : 'Add'}
                            </Button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default DrugModalPop;