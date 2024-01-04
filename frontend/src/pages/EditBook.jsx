import { Box, Container } from "@mui/material"
import Header from "../components/Header"
import BookFrom from "../components/BookFrom"

const EditBook = () => {
    return (
        <Box>
            <Header title='Update Book' />
            <Container maxWidth='sm'>
                <BookFrom isEdit={true} />
            </Container>
        </Box>
    )
}

export default EditBook