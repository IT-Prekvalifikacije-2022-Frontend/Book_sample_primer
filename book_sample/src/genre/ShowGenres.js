import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import './show_genres.css'
import { Box, Button, Container, FormControl, List, Stack, TextField } from "@mui/material";
import { useState } from "react";
import ShowGenre from "./ShowGenre";
const ShowGenres = () => {
    const genres = useLoaderData();
    const navigate = useNavigate();

    const [showGenres, setShowGenres] = useState(genres);

    // pretraga zanrova
    const search = (value) => {
        if (value == "") {
            setShowGenres(genres);
          } else {
            const a = genres.filter((a) =>
              a.name.toLowerCase().includes(value.toLowerCase())
            );
            setShowGenres(a);
          }
    }


    return <Container>
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
      <Button variant="outlined" onClick={() => navigate("new_genre")}>
        {" "}
        Add new genre{" "}
      </Button>
    </Box>

    <Stack sx={{width:'50%', display: 'flex', margin:'auto' }}>
        <List>
        {showGenres.map((g) => (
        <ShowGenre
          genre={g}
          onDelete={(genreId) => {
            const list = genres.filter((g) => g.id != genreId);
            setShowGenres(list);
          }}
        />
      ))}
        </List>
      
    </Stack>
  </Container>

    
    // pre MUI-a
    // <div> 
    // {/* search part */}
    //     <header className="books_container_header">
    //         <div class="genre_input-container">
    //             <input className='genre_input-field' type="text" placeholder="Search..." />
    //             <button className="genre_search_button">Search</button>  
    //         </div>
    //         <button className='add_btn' onClick={()=>navigate('add_new')}>Add New Genre</button>
    //     </header>
    //     <div className="container_show_genres">
    //         <ul className="genres_overviewcard">
    //         {genres.map((g) => <li className="genre_item">{g.name}</li>)}
    //         </ul>
                
    //     </div>
    //  </div>
}

export default ShowGenres;