import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Onlines {
    kinight: member[];
    sorcerer: member[];
    druid: member[];
    paladin: member[];
}

interface member {
    joined: string;
    level: number;
    name: string;
    rank: string;
    status: string;
    title: string;
    vocation: string;
}
const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'level', headerName: 'Level', width: 130 },
];


export default function DataTable() {
    const [onlines, setOnlines] = useState<Onlines>({ kinight: [], sorcerer: [], druid: [], paladin: [] });

    useEffect(() => {

        const loadOnlines = async () => {
            // Till the data is fetch using API 
            // the Loading page will show.         

            // Await make wait until that 
            // promise settles and return its result 
            const response = await axios.get<Onlines>(
                "https://rspv.azurewebsites.net/api/GetGuild?guild=Honbraland%20encore"
            );

            // After fetching data stored it in posts state. 
            setOnlines(response.data);

        };

        // Call the function 
        loadOnlines();
    }, []);
    return (
        <div style={{ height: 600, width: '100%' }}>
            <h1>EK's</h1>
            <DataGrid
                rows={onlines.kinight}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row: any) => row.name}
            />
            <h1>RP's</h1>
            <DataGrid
                rows={onlines.paladin}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row: any) => row.name}
            />
            <h1>ED's</h1>
            <DataGrid
                rows={onlines.druid}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row: any) => row.name}
            />
            <h1>MS's</h1>
            <DataGrid
                rows={onlines.sorcerer}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row: any) => row.name}
            />
        </div>
    );
}