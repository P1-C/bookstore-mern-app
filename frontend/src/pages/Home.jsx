import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from 'notistack';



const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/`)
            .then((response) => {
                setBooks(response.data.data)
                // console.log(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                enqueueSnackbar('Something went wrong', { variant: 'error' });
                setLoading(false)
            })

    }, [])

    const columns = [
        { field: '_id', headerName: 'UNIQUE ID', width: 240 },
        { field: 'title', headerName: 'Book Title', width: 200 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'publishYear', headerName: 'PublishYear', width: 100 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton component={Link} to={`/books/edit/${params.row._id}`}><EditRoundedIcon /></IconButton>
                    <IconButton component={Link} to={`/books/details/${params.row._id}`}><PreviewIcon /></IconButton>
                    <IconButton component={Link} to={`/books/delete/${params.row._id}`}><DeleteForeverRoundedIcon /></IconButton>
                </>
            ),
        },
    ]
    return (
        <Box>
            <Box display='flex' flexDirection='row' justifyContent="space-between" px={14}>
                <Typography my={1} variant="h4" textAlign="center">Books List</Typography>
                <IconButton disableRipple component={Link} to={`/books/create/`}><PostAddRoundedIcon color="primary" /></IconButton>
            </Box>
            <Divider />
            {loading ? <Spinner /> : ''}
            <Container>
                {
                    books &&
                    <DataGrid
                        sx={{ mx: 12, my: 4 }}
                        rows={books}
                        getRowId={(row) => row._id}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                    />
                }
            </Container>
        </Box>
    )
}

export default Home