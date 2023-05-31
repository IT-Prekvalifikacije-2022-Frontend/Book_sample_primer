// komponenta za prikaz autora, stavicemo da se prikaze ime autora a onda ispoda da se prikazu podaci o knjizi, za knjige cemo upotrebi komponentu ShowBook 

import { Box, Container, Grid, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom"
import ShowBook from './../books/ShowBook';

const AuthorDetails = () => {
    const author = useLoaderData(); //preuzmemo podatke koje nam je loader dobavio

    return <Container>
        <Box sx={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <Typography sx={{fontSize: '30px', fontWeight: 'bold'}}>{author.name}</Typography>
        </Box>
        {/* grid za prikaz svih knjiga */}
        <Grid container spacing='3'> 
        {/* author=true atribut cemo koristiti samo da neke delove knjige ne prikazemo ako je prikaz knjige u sklopu AuthorDetails komponente */}
            {author.books.map((b) => <ShowBook author="true" book={b}/>)}
        </Grid>
    </Container>


}

export default AuthorDetails;

