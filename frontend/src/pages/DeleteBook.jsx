import { Box, Button, Card, CardActions,  CardContent, Container, Typography } from "@mui/material"
import Header from "../components/Header"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar }= useSnackbar()

    const handleDelete = () => {
        event.preventDefault()
        setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully',{variant:'success'})
        navigate('/');
    })
    .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully',{variant:'error'})
        console.log(error);
      });
      };

    return (
        <Box>
            {loading ? <Spinner /> : ''}
            <Header title='Delete book' />
            <Container maxWidth='sm' sx={{ marginTop: 4 }}>
                <Card variant='outlined'>
                    <CardContent>
                    <Typography variant="h5" gutterBottom>Confirm Book Deletion</Typography>
                        <Typography variant="body1" color='GrayText'>
                            Are you sure you want to delete this book? This action cannot be undone.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display='flex' flexDirection='row-reverse' padding={1} width='100%'>
                        <Button
                            variant="outlined"
                            onClick={handleDelete}
                            color="error">
                            Delete
                        </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    )
}

export default DeleteBook