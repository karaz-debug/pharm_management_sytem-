import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { width } from '@mui/system';
import { Avatar } from '@mui/material';
import moment from 'moment'
import ActionsRow from './ActionsRow';
import { useEffect } from 'react';
import { useState } from 'react';

function PageSizeCustomOptions() {
    const [pageSize, setPageSize] = React.useState(5);

    const myData = [
        { photoURL: 'https://flowbite.com/docs/images/logo.svg', name: 'FlowRite', email: 'abdiqfr11@gmail.com', role: 'Admin', active: 'true', createdAt: '20171212121111', _id: '1' },
        { photoURL: 'https://flowbite.com/docs/images/logo.svg', name: 'FlowRite', email: 'abdiqfr11@gmail.com', role: 'sales', active: 'false', createdAt: '20171212121111', _id: '2' },
        { photoURL: 'https://flowbite.com/docs/images/logo.svg', name: 'FlowRite', email: 'abdiqfr11@gmail.com', role: 'doctor', active: 'true', createdAt: '20171212121111', _id: '3' },
        { photoURL: 'https://flowbite.com/docs/images/logo.svg', name: 'FlowRite', email: 'abdiqfr11@gmail.com', role: 'monitor', active: 'false', createdAt: '20171212121111', _id: '4' },

    ];

    function handleUpdate(rowData) {
        console.log("Update User:", rowData);
    }
    function handleDelete(rowData) {
        console.log("Delete User:", rowData);
    }
    function handleSuspend(rowData) {
        console.log("Suspend User:", rowData);
    }



    const columns = [
        { field: 'photoURL', headerName: 'Avatar', width: 60, renderCell: params => <Avatar src={params.row.photoURL} />, sortable: false, filterable: false },
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 100, type: 'singleSelect', valueOptions: ['basic', 'editor', 'admin'], editable: true },
        {
            field: 'active',
            headerName: 'Active',
            width: 200,
            type: 'boolean',
            editable: true,
            renderCell: params => params.row.active == 'true' ? '✔' : 'X'
        },

        { field: 'createdAt', headerName: 'Created At', width: 200, renderCell: params => moment(params.row.createdAt).format('YYYY-MM-DD-HH:MM:SS') },
        { field: '_id', headerName: 'Id', width: 150 },
        // {
        //     field: 'Action',
        //     headerName: 'Action',
        //     render: (rowData) => (
        //         <>
        //             <button onClick={() => handleUpdate(rowData)}>Update</button>
        //             <button onClick={() => handleDelete(rowData)}>Delete</button>
        //             <button onClick={() => handleSuspend(rowData)}>Suspend</button>
        //         </>
        //     )
        // }
        { field: 'actions', headerName: 'Actions', width: 200, renderCell: (row) => <ActionsRow row={row} handleDelete={handleDelete} handleUpdate={handleUpdate} handleSuspend={handleSuspend} /> }


    ];



    const myDataWithId = myData.map((row, index) => {
        row.id = index + Date.now();
        return row;
    });


    // const [scrollPosition, setScrollPosition] = useState(0);
    // const [isHidden, setIsHidden] = useState(false);

    // useEffect(() => {
    //     function handleScroll() {
    //         const currentPosition = window.pageYOffset;
    //         console.log(currentPosition)
    //         setScrollPosition(currentPosition);

    //         if (currentPosition > 100) {
    //             setIsHidden(true);
    //         } else {
    //             setIsHidden(false);
    //         }
    //     }

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [scrollPosition]);


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                className="data-grid"
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                rows={myDataWithId}
                columns={columns}
            />

        </div>
    );
}

export default PageSizeCustomOptions;

