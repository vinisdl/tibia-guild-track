import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridApi, GridColDef } from '@mui/x-data-grid';
import { Button } from "@mui/material";

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
    {
        field: "action",
        headerName: "Exiva",
        sortable: false,
        renderCell: (params: any) => {
            const onClick = (e: React.MouseEvent) => {
                const currentRow = params.row;
                navigator.clipboard.writeText(`exiva "${currentRow.name}"`);

            };

            return (
                <Button variant="outlined" color="warning" size="small" onClick={onClick}>Exiva</Button>
            );
        },
        width: 130
    }
];


export default function DataTable() {
    const [onlines, setOnlines] = useState<Onlines>({ kinight: [], sorcerer: [], druid: [], paladin: [] });

    useEffect(() => {

        const loadOnlines = async () => {
            // Till the data is fetch using API 
            // the Loading page will show.         

            // Await make wait until that 
            // promise settles and return its result 
            const response = await axios.get<TibiaData>(
                "https://api.tibiadata.com/v4/guild/Honbraland%20encore"
            );




            var online = response.data.guild.members.filter((item) => item.status === "online").slice().sort((p1, p2) =>
                p1.level < p2.level ? 1
                    : p1.level > p2.level ? -1
                        : 0)


            var onlines = {
                kinight: online.filter((item) => item.vocation.includes("Knight")),
                sorcerer: online.filter((item) => item.vocation.includes("Sorcerer")),
                druid: online.filter((item) => item.vocation.includes("Druid")),
                paladin: online.filter((item) => item.vocation.includes("Paladin"))
            }


            // After fetching data stored it in posts state. 
            setOnlines(onlines);

        };

        // Call the function 
        loadOnlines();

        setInterval(() => { loadOnlines(); }, 5000);

    }, []);
    return (
        <div style={{ height: 600, width: '100%' }}>
            <header>
                <h1>Online Members</h1>
                <b>{onlines.druid.length + onlines.sorcerer.length + onlines.kinight.length + onlines.paladin.length}</b>
            </header>

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


export interface TibiaData {
    guild: Guild
    information: Information
}

export interface Guild {
    active: boolean
    description: string
    disband_condition: string
    disband_date: string
    founded: string
    guildhalls: Guildhall[]
    homepage: string
    in_war: boolean
    invites: Invite[]
    logo_url: string
    members: Member[]
    members_invited: number
    members_total: number
    name: string
    open_applications: boolean
    players_offline: number
    players_online: number
    world: string
}

export interface Guildhall {
    name: string
    paid_until: string
    world: string
}

export interface Invite {
    date: string
    name: string
}

export interface Member {
    joined: string
    level: number
    name: string
    rank: string
    status: string
    title: string
    vocation: string
}

export interface Information {
    api: Api
    status: Status
    timestamp: string
}

export interface Api {
    commit: string
    release: string
    version: number
}

export interface Status {
    error: number
    http_code: number
    message: string
}
