/* eslint-disable react/prop-types */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useSnackbar } from "notistack";


const years = [...Array(new Date().getFullYear() - 2000 + 1).keys()].map(
    (year) => year + 2000
);

const BookFrom = ({ isEdit }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState(years[0]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar }= useSnackbar()

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeAuthor = (event) => setAuthor(event.target.value);
    const handleChangePublishYear = (event) => setPublishYear(event.target.value);

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            axios.get(`http://localhost:5000/books/${id}`)
                .then((response) => {
                    setAuthor(response.data.author);
                    setPublishYear(response.data.publishYear)
                    setTitle(response.data.title)
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    enqueueSnackbar('An error happened. Please Chack console',{ variant:'error'})
                    console.log(error);
                });
            }
        }, [])
        
        
        
        const handleSubmit = (event) => {
            event.preventDefault();
            const data = {
                title,
                author,
                publishYear,
            };
            setLoading(true);
            if (isEdit) {
                axios
                .put(`http://localhost:5000/books/${id}`, data)
                .then(() => {
                    setLoading(false);
                    enqueueSnackbar('Book updated successfully',{ variant:'success'})
                    navigate('/');
                })
                .catch((error) => {
                    setLoading(false);
                    enqueueSnackbar('An error happened. Please Chack console',{ variant:'error'})
                    console.log(error);
                });
        } else {

            axios
                .post('http://localhost:5000/books', data)
                .then(() => {
                    setLoading(false);
                    enqueueSnackbar('Book created successfully',{ variant:'success'})

                    navigate('/');
                })
                .catch((error) => {
                    setLoading(false);
                    enqueueSnackbar('An error happened. Please Chack console',{ variant:'error'})
                    console.log(error);
                });
        }
        setTitle("");
        setAuthor("");
        setPublishYear(years[0]);
    };

    return (
        <>
            {loading ? <Spinner /> : ''}
            <Box
                border={1}
                borderRadius={5}
                component='form'
                onSubmit={handleSubmit}
                display='flex'
                flexDirection='column'
                alignItems='center'
                margin={4}
                padding={4}
                gap={3}
            >
                <Typography variant="h6" component="h2">
                    {isEdit ? 'Edit Book' : 'New Book'}
                </Typography>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    fullWidth
                    onChange={handleChangeTitle}
                    required
                />
                <TextField
                    label="Author"
                    variant="outlined"
                    value={author}
                    fullWidth
                    onChange={handleChangeAuthor}
                    required
                />
                <FormControl fullWidth required>
                    <InputLabel>Publish Year</InputLabel>
                    <Select
                        value={publishYear}
                        onChange={handleChangePublishYear}
                        label="Publish Year"
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained">
                    {isEdit ? 'Update' : 'Create'}
                </Button>
            </Box>
        </>
    )
}

export default BookFrom