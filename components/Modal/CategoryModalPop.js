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
    input: {
        display: 'none',
    },
    button: {
        margin: 1,
    },
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

function CategoryModalPop({ isOpen, onClose, selectedCategory }) {
    const [category, setCategory] = useState({});

    useEffect(() => {
        if (selectedCategory) {
            setCategory({
                Name: selectedCategory.Name || '',
                Description: selectedCategory.Description || '',

            });
        } else {
            setCategory({
                Name: '',
                Description: '',
            });
        }
    }, [selectedCategory]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setCategory({
            ...category,
            [name]: value
        })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            let method;
            let url;
            if (selectedCategory) {
                method = 'PUT';
                url = `http://localhost:3001/admin/category/${selectedCategory._id}`;
            } else {
                method = 'POST';
                url = 'http://localhost:3001/admin/category';
            }
            response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(category),
            });
            const data = await response.json();
            console.log(data);
            onClose(false);
        } catch (err) {
            console.error(err);
        }
    }




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
                            margin="dense"
                            id="Name"
                            name="Name"
                            label="Category name"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={category.Name}
                        />
                        <TextField
                            margin="dense"
                            id="Description"
                            name="Description"
                            label="Description"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={category.Description}
                        />

                        {/* <InputLabel htmlFor="profile-picture-input">Upload Profile Picture</InputLabel>
                        <Input
                            id="profile-picture-input"
                            type="file"
                            className={classes.input}
                            onChange={handleFileChange}
                        /> */}

                    </form>

                    <div className="flex gap-20 mt-4">
                        <div>
                            <Button onClick={onClose} className={useStyles.button} color="primary" >
                                Cancel
                            </Button>
                        </div>
                        <div>
                            <Button type="submit" onClick={handleSubmit} className={useStyles.button} color="primary">
                                {selectedCategory ? 'Edit' : 'Add'}
                            </Button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default CategoryModalPop;

