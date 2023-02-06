import React from 'react'

const ActionsRow = ({ row, handleUpdate, handleSuspend }) => {
    return (
        <div className="flex gap-1">
            <button className="px-4 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() => handleUpdate(row)}>Activate</button>
            <button className="px-4 py-1 font-medium text-white bg-green-500 rounded-md hover:bg-green-600" onClick={() => handleSuspend(row)}>Suspend</button>
        </div>
    );
}


export default ActionsRow
