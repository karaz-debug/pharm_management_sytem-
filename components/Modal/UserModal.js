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
    input: {
        display: 'none',
    },
    button: {
        margin: 1
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

function UserModal({ isOpen, onClose }) {
    const [user, setUser] = useState({
        Name: '',
        Email: '',
        Password: '',
        Role: '',
        PhoneNumber: '',
        Address: '',
    })

    const [profile, setProfile] = useState({
        profilePicture: null,
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        if (event.target.files && event.target.files[0]) {
            setProfile({
                ...profile,
                profilePicture: event.target.files[0],
            })
        }

        setUser({
            ...user,
            [name]: value,
            profile
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        // Send the stock data to the server or perform other logic here
        console.log(user)
        onClose(false);
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
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={user.Name}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            onChange={handleChange}
                            value={user.Email}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Address"
                            name="Address"
                            label="Address"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={user.Address}
                        />
                        <TextField
                            margin="dense"
                            id="Password"
                            name="Password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={handleChange}
                            value={user.Password}
                        />

                        <FormControl sx={{ mt: 2, minWidth: 250 }} size="small" className={useStyles.formControl}>
                            <InputLabel id="demo-select-small">Category</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={user.Role}
                                name="category"
                                label="category"
                                onChange={handleChange}
                            >

                                <MenuItem value={10}>Admin</MenuItem>
                                <MenuItem value={20}>Sales Person</MenuItem>
                                <MenuItem value={30}>Doctor</MenuItem>
                                <MenuItem value={30}>Monitor</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="mt-4">
                            <InputLabel htmlFor="profile-picture-input">Upload Profile Picture</InputLabel>
                            <Input
                                id="profile-picture-input"
                                type="file"
                                className={useStyles.input}
                                onChange={handleChange}
                            />
                        </div>

                    </form>

                    <div className="flex gap-20 mt-4">
                        <div>
                            <Button onClick={onClose} className={useStyles.button} color="primary" >
                                Cancel
                            </Button>
                        </div>
                        <div>
                            <Button type="submit" onClick={handleSubmit} className={useStyles.button} color="primary">
                                Add
                            </Button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default UserModal;

