import { useLoaderData, useNavigate } from "react-router-dom";
import ShowAuthor from "./ShowAuthor";
import "./show_authors.css";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
const ShowAuthors = () => {
  const authors = useLoaderData();
  const navigation = useNavigate();
  const [showAuthors, setShowAuthors] = useState(authors);

  const search = (value) => {
    // pretraga autora po imenu

    if (value == "") {
      setShowAuthors(authors);
    } else {
      const a = authors.filter((a) =>
        a.name.toLowerCase().includes(value.toLowerCase())
      );
      setShowAuthors(a);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        {/* definisan onChange dogadjaj, svaki put kada se unese nova vrednost pozove se funkcija search  */}
        <FormControl sx={{ width: "30%" }}>
          <TextField
            placeholder="Search..."
            label="Search"
            onChange={(e) => search(e.target.value)}
          />
        </FormControl>

        {/* authors/new_author */}
        <Button variant="outlined" onClick={() => navigation("new_author")}>
          {" "}
          Add new author{" "}
        </Button>
      </Box>

      <Stack direction="column">
        {showAuthors.map((a) => (
          <ShowAuthor
            author={a}
            onDelete={(authorId) => {
              const list = authors.filter((a) => a.id != authorId);
              setShowAuthors(list);
            }}
          />
        ))}
      </Stack>
    </Container>
  );

  // <div className='authors_container'>
  // {/* search part */}
  //     <header className="authors_container_header">
  //         <div class="author_input-container">
  //             <input className='author_input-field' type="text" placeholder="Search..." />
  //             <button className="author_search_button">Search</button>
  //         </div>
  //         <button className='add_btn' onClick={()=>{navigation('add_new')}}>Add New Author</button>
  //     </header>
  //     <div className="container_show_authors">
  //             {authors.map((a) => <ShowAuthor author={a}/>)}
  //     </div>
  //  </div>
};

export default ShowAuthors;
