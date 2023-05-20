import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import ShowBook from "./ShowBook";
import "./show_books.css";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

/*
Komponenta koja sluzi za prikaz liste knjiga. Na osnovu DTI/a koji Vam je dat na ucionici mozete videti sta se sve nalazi na stranici kada se klikne na opciju Books. Na osnovu te slike definisana je komponenta. Komponenta moze da se izdeli na nekoliko delova:
    - header - polje za pretragu, select kontrola za filtriranje knjiga po zanru, dugme za dodavanje nove knjige 
    - prikaz knjiga - kontejner u kojem su prikazane sve knjige kao kartice, da bi dobili prikaz koji je trazen definisali smo odredjeni stil u fajlu show_books.css
*/

const ShowBooks = () => {
  // preuzmemo podatke koje nam je loader ucitao, on za nas odradi sve sto smo mi inace pisali kada pozovemo fetch metodu, raspakuje nam odgovor (!vodite racuna - napisali smo da se samo pozove funkcija fetch nismo vodili racuna o greskama, pozeljno bi bilo da i to dodamo)
  const books = useLoaderData();
  // lista zanrova treba ce nam kako bi omogucili filtriranje na osnovu zanra
  const [genres, setGenres] = useState([]);
  // lista knjiga koje cemo prikazivati, ovo nam je neophodno zato sto imamo opcije filtriranja i pretrage i onda necemo uvek prikazivati sve knjige
  // ova lista je stanje zato sto hocemo da se prikaz osvezi kada se ona promeni i na pocetku ova lista ima sve knjige koje smo ucitali
  const [showBooks, setShowBooks] = useState(books);

  const navigate = useNavigate();

  // ovde smo useEffect iskoristili za ucitavanje svih zanrova i ova funkcija efekt ce da se izvrsi samo jednom kada se komponenta prvi put prikaze
  useEffect(() => {
    let ignore = false;
    const getGenres = async () => {
      let res = await fetch("http://localhost:8080/api/v1/genre");
      let result = await res.json();
      if (!ignore) {
        setGenres(result);
      }
    };
    getGenres();
    return () => {
      ignore = true;
    };
  }, []);

  // funkcija koja radi filtriranje knjiga kada korisnik izabere neku opciju iz select elementa
  const filterByGenre = (e) => {
    // e.target.value - preuzmemo koju opciju je korisnik izabrao
    // ako je opcija 0 to znaci da se ponistava filter pa onda korisniku prikazemo sve knjige
    if (e.target.value == 0) {
      setShowBooks(books);
    } else {
      // ako je korisnik izabrao neki zanr, onda radimo filtriranje tako sto prvo pronadjemo koji zanr je korisnik izabrao posto knjiga sadrzi ime zanra, a definisali smo da je value za opciju u okviru select-a id-a zanra zato sto value mora da bude jedinstven
      const selectGenre = genres.find((g) => g.id == e.target.value);
      // filtriramo sve knjige pomocu funkcije filter
      const filterBooks = books.filter((b) => b.genre === selectGenre.name);
      // postavimo novu vrednost za stanje showBooks, tj prikazemo filtrirane knjige
      setShowBooks(filterBooks);
    }
  };

  const handleDelete = (bookId) => {
    // osvezimo prikaz
    const fb = showBooks.filter((b) => b.id != bookId);
    setShowBooks(fb);
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
       
        {/* definisan onChange dogadjaj, svaki put kada se promeni izabrana opcija pozvace se funkcija filterByGenre  */}
        <FormControl sx={{width: '30%'}}>
          <InputLabel id="demo-select-small-label">Genre</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="genre-select"
            label="Genre"
            onChange={filterByGenre}
            
          >
            <MenuItem value="0">
              <em>None</em>
            </MenuItem>
            {genres.map((g) => (
              <MenuItem value={g.id}> {g.name} </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* OVO JE KOD PRE MUI/A */}
        {/* <select className="select" onChange={filterByGenre}>
                {/* ova opcija nam sluzi samo da ponistimo filter, inace ovo se resava pomocu dodatnog dugmeta za resetovanje filtera */}
        {/* <option value='0'>Genre</option> */}
        {/* dinamicko kreiranje opcija - posto ne znamo unapred koje sve zanrove imamo nego ih dobavljamo sa back-end-a - koristimo map funkciju koja nam objekte zanr pretvori u html element option; html element option obavezno zahteva atribut value jer na osnovu njega posle mozemo da izvucemo koja opcija je selektovana */}
        {/* </select> */}
        {/* dodato dugme za dodavanje nove knjige, klikom na dugme prikazuje se forma za unos nove knjige */}
        <Button variant="outlined" onClick={() => navigate("new_book")}>
          {" "}
          Add new book{" "}
        </Button>
      </Box>
      {/* <div className="books_container">  */}
      {/* Kontejner za prikaz svih knjiga, posto se knjige prikazuju u vidu kartica, a to nije jednostavan html element, onda mozemo da tu jednu karticu predstavimo novom komponentom, u nasem slucaju je to komponenta ShowBook i toj komponenti prosledjujemo knjigu koju treba da prikaze.
        Posto ne znamo koliko knjiga imamo u listi onda opet dinamicki pravimo prikaz tako sto korisimo map funkciju samo sad objekte book pretvaramo u ShowBook elemente.
        MUI element GRID zna da sam rasporedi elemente u vidu mreze, u grid containeru se obavezno nalaze Grid elementi koji su oznaceni sa item
         */}
      <Grid container spacing={3}>
        {showBooks.map((b) => (
          <ShowBook book={b} onDelete={handleDelete} />
        ))}
      </Grid>
      {/* </div> */}
    </Container>
  );
};

export default ShowBooks;
