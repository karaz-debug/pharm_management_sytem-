import React, { useState } from 'react';
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

function ModalPop({ isOpen, onClose }) {

    const [drug, setDrug] = useState({
        name: '',
        dosage: '',
        quantity: '',
        company: '',
        category: ''
    });

    const classes = useStyles();
    const handleChange = (event) => {
        setDrug({ ...drug, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(drug)
        // add code here to submit the drug data to the pharmacy management system
        onClose(false);
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
                            value={drug.company}
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
                            <Button onClick={onClose} className={classes.button} color="primary" >
                                Cancel
                            </Button>
                        </div>
                        <div>
                            <Button type="submit" onClick={handleSubmit} className={classes.button} color="primary">
                                Add
                            </Button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default ModalPop;