import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Rating, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";

const BookDetails = () => {
    const book = useLoaderData();

    return  <Container>
       <Card sx={{ marginBottom: 3 }} variant="outlined">
        <CardHeader
          sx={{ display: "flex", textAlign: "center" }}
          title={book.title}
        />
        <CardMedia
          sx={{ height: 400 }}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/640px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg"
          title={book.title}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontSize={25}>{book.authors}</Typography>
        
          <Grid container spacing={3} direction='row' alignItems='center' justifyContent='center'  sx={{padding: '5px', maxWidth: '50%'}}> 
          {/* alignItems - vertikalno poravnanje; 
          justifyContente - horizontalno poravnanje */}
            <Grid item xs={6}>
                Year
            </Grid>
            <Grid item xs={6}>
                {book.year}
            </Grid>

            <Grid item xs={6} >
                ISBN
            </Grid>
            <Grid item xs={6}>
                {book.isbn}
            </Grid>

            <Grid item xs={6} >
                Genre
            </Grid>
            <Grid item xs={6}>
                {book.genre}
            </Grid>
            <Grid item xs={6} >
                Rating
            </Grid>
            <Grid item xs={6}>
                {/* readOnly znaci da je nesto samo za citanje, tako da posto ovde samo ispisuje podatke onda cemo upotrebiti ovaj atribut */}
                <Rating value={book.rating} readOnly />
            </Grid>
          </Grid>
        </CardContent>
       
      </Card>
    </Container>
    
    //  PRE MUI-A
    // <div className="book_overview">
    //             <div > <p className="book_title">{book.title} </p></div>
    //             <div className="book_info">
    //                 <div className="book_authors">{book.authors}</div>
    //                 <div className="book_year">Year: {book.year}</div>
    //                 <div className="book_isbn">ISBN: {book.isbn}</div>
    //                 <div className="book_genre">Genre: {book.genre}</div>
    //                 <div className="book_rating">Rating: {book.rating}</div>
    //             </div>
    //         </div>  
}

export default BookDetails;