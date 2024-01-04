import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

const ShowBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((response) => {
                setBook(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        <Box>
            <Header title='Book details' />
            {
                loading ? (
                    <Spinner />
                ) : (
                    <Container maxWidth='sm' sx={{ marginTop: 4 }}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">Unique ID</Typography>
                                        <Typography variant="body1" color='GrayText'>
                                            {book._id}
                                        </Typography>
                                        </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">Title</Typography>
                                        <Typography variant="body1" color='GrayText'>
                                            {book.title}
                                        </Typography>
                                        </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">Author</Typography>
                                        <Typography variant="body1" color='GrayText'>
                                            {book.author}
                                        </Typography>
                                        </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">Publish Year</Typography>
                                        <Typography variant="body1" color='GrayText'>
                                            {book.publishYear}
                                        </Typography>
                                        </Grid>
                                    <Grid item xs={12} >
                                        <Divider sx={{marginY: 2}}/>
                                        <Typography paragraph variant="body1" color='GrayText'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid molestiae, perferendis ipsam placeat unde corporis aperiam facere, totam, soluta ratione aspernatur! Blanditiis quam cupiditate corrupti asperiores nulla consequatur perferendis?
                                        </Typography>
                                        <Typography paragraph variant="body1" color='GrayText'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid molestiae, perferendis ipsam placeat unde corporis aperiam facere, totam, soluta ratione aspernatur! Blanditiis quam cupiditate corrupti asperiores nulla consequatur perferendis?
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid molestiae, perferendis ipsam placeat unde corporis aperiam facere, totam, soluta ratione aspernatur! Blanditiis quam cupiditate corrupti asperiores nulla consequatur perferendis?
                                        </Typography>
                                        <Typography paragraph variant="body1" color='GrayText'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid molestiae, perferendis ipsam placeat unde corporis aperiam facere, totam, soluta ratione aspernatur! Blanditiis quam cupiditate corrupti asperiores nulla consequatur perferendis?
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid molestiae, perferendis ipsam placeat unde corporis aperiam facere, totam, soluta ratione aspernatur! Blanditiis quam cupiditate corrupti asperiores nulla consequatur perferendis?
                                        </Typography>
                                        </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                )
            }

        </Box>
    )
}

export default ShowBook