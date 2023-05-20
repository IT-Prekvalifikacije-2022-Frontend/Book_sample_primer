import { useNavigate } from "react-router-dom";
import "./show_book.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

/* 
Komponenta za prikaz jedne knjige, kao parametar prima knjigu koju treba da prikaze. Poziva se iz ShowBooks komponente. 
*/

// roditelja => dete ==> ShowBooks -> ShowBook => (props)
// dete  => roditelja ->  ShowBook -> ShowBooks => pozove se funkcija koja se prosledjena kao props

const ShowBook = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const deleteBook = async () => {
    // brisanje knjige
    // koristimo fetch funkciju kako bi se obratili serveru i gadjamo endpoint za brisanje knjige
    // posto je zahtev delete onda to moramo i naznaciti dodavanje metoda
    let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // proverimo odgovor koji smo dobili od servera i na osnovu toga odradimo sta zelimo
    if (response.ok) {
      let d = await response.json();
      console.log("uspesno obrisana knjiga");
      onDelete(book.id);
    } else {
      console.log("greska priikom brisanja");
    }
  };

  // Ovde smo odredili koliko elementa ce da bude u jednom redu xs={{4}} znaci da cemo u redu imati 3 elementa, posto MUI grid je definisan tako da ceo prostor deli na 12 jednakih kolona
  return (
    <Grid item xs={4}>
      <Card sx={{ marginBottom: 3 }} variant="outlined">
        <CardHeader
          sx={{ display: "flex", textAlign: "center" }}
          title={book.title}
        />
        <CardMedia
          sx={{ height: 140 }}
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
        
          <Grid container spacing={3} alignItems='center' justifyContent='space-between' sx={{padding: '5px'}}> 
          {/* alignItems - vertikalno poravnanje; 
          justifyContente - horizontalno poravnanje */}
            <Grid item xs={6} >
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
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          {/* <Button variant='outlined' size='small' onClick={()=> navigate(`book/${book.id}`)}> Info </Button> */}
          {/* <Button variant='outlined' size='small'> Edit </Button> */}
          {/* <Button variant='outlined' size='small' onClick={deleteBook } color='error'> Delete </Button> */}
          {/* Tooltip => koristimo komponentu da bi ispisali nesto o nekoj kontroli, prelaskom preko dugmica ispisace nam se tekst koji smo definisali u atributu title */}
          <Tooltip title="Info">
            <IconButton
              aria-label="info"
              onClick={() => navigate(`book/${book.id}`)}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => navigate(`edit_book/${book.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteBook}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );

  // <div className='book_card'>
  //             {/* naslov knjige  */}
  //             <div className='book_title_container'>
  //                 <p className='book_title'> {book.title} </p>
  //             </div>
  //             {/* informacije */}
  //             <div className='book_info'>
  //                 <div> {book.authors} </div>
  //                 <div> {book.year} </div>
  //                 <div> {book.isbn} </div>
  //                 <div> {book.genre} </div>
  //                 <div> {book.rating} </div>
  //             </div>
  //             <div>
  //                 {/* 3 dugmeta za prikaz jedne knjige, izmenu i brisanje */}
  //                 {/* prikaz knjige, klikom na ovo dugme otvara se nova stranica na kojoj treba da se prikaze odredjena knjiga - funkcija navigate (programska navigacija u app) - prebacuje nas na odredjenu putanju koju smo definisali u ruteru  */}
  //                 <button className='new_btn' onClick={()=> navigate(`book/${book.id}`)}> Book details </button>
  //                 <button className='new_btn'> Edit </button>
  //                 {/* brisanje knjige, klikom na ovo dugme dolazi do poziva funkcije deleteBook u kojoj je implementirana logika za brisanje knjige */}
  //                 <button className='new_btn' onClick={deleteBook}> Delete </button>
  //             </div>
  //        </div>
};

export default ShowBook;
