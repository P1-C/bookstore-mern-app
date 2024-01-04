import { Container } from "@mui/material"
import Header from "../components/Header"
import BookFrom from "../components/BookFrom"

const CreateBook = () => {
  return (
    <div>
      <Header title='Create book'></Header>
      <Container maxWidth='sm'>
        <BookFrom />
      </Container>
    </div>
  )
}

export default CreateBook