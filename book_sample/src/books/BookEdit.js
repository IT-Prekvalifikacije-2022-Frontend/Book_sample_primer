import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { produce } from "immer";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

// komponenta za izmenu knjige
const BookEdit = () => {
  // u loaderu smo definisali da vraca niz u kojem je prvi element je knjiga, pa autori i  zanrovi
  const data = useLoaderData();
  const book = data[0];
  const authors = data[1];
  const genres = data[2];
  // useNavigate je hook u sklopu react-router-dom biblioteke i sluzi za programsku navigaciju u aplikaciji
  const navigate = useNavigate();

  // posto menjamo knjigu onda ce pocetne vrednosti biti vrednosti za tu knjigu, ovako smo radili pre ubacivanja Immera
  // const [title, setTitle] = useState(book.title);
  // const [isbn, setIsbn] = useState(book.isbn);
  // const [year, setYear] = useState(book.year);
  // const [rating, setRating] = useState(book.rating);
  // const [genre, setGenre] = useState(book.genre);
  // const [author, setAuthor] = useState(book.authors[0]);

  // dodavanje immer-a
  const [knjiga, setKnjiga] = useState(book); // kompleksno stanje zato sto je objekat, povezali smo sve atribute knjige u objekat
  // const [knjiga, setKnjiga] = useImmer(book);

  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Please enter the ";
  // ova stanja ce da budu strigovi koje cemo iskoristiti i kao poruku i kao naznaku da postoji greska
  const [titleError, setTitleError] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [yearError, setYearError] = useState("");
  const [genreError, setGenreError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  // Posto hocemo da napravimo da korisnik moze da izabere vise autora onda cemo to uraditi kao i kod dodavanja nove knjige upotrebom autocomplete elementa tako sto cemo birati jednog po jednog autora i dodavati ih u listu klikom na dugme ADD
  //treba nam autor da bismo znali koga je korisnik izabrao iz liste i koga treba da dodamo u niz autora za knjigu
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  // funkcija za izmenu podataka
  // setKnjiga -> baseState=knjiga, draft - kopija knjige -> koristimo produce funkciju zato sto je kompleksno stanje pa hocemo da na jednostavan nacin izmenimo podatke
  // izdvojimo u funkciju zato sto sve podatke osim autora menjamo na isti nacin 
  // da bismo znali koji podatak menjamo definisacemo name atribut za svaki element odnosno za svako polje za unos podataka
  const changeBook = (e) => {
    setKnjiga(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const update = async () => {
    // dodavanje nove knjige
    // atribut: vrednost
    // new_book je objekat koji cemo proslediti serveru, izgled objekta je definisan na strani servera i imena atributa moraju da se poklapaju sa imenima atributa na serveru

    // ovde cemo za svaki slucaj da proverimo da li je korisnik uneo sve podatke ako nije ispisacemo mu poruku
    // if (title == "" || isbn == "" || year == "" || genre == 0 || author == 0) {
    //   // dodacu novo stanje koje ce mi samo ovde sluziti i to je globalna greska da korisnik nije popunio nista u formi
    //   setGlobalError("Please fill all fields in the form");
    //   return; // ne smem da dodam knjigu
    // }

    // pre immer-a
    // const new_book = {
    //   title: title,
    //   isbn: isbn,
    //   year: year,
    //   rating: rating,
    //   genre: genre,
    //   authors: [author],
    // };
    // posto je PUT zahtev onda fetch funkciji pored url/a prosledjujemo i dodatne podatke kao sto su metod, zaglavlje u kojem definisemo kakve podatke saljemo i body gde definisemo koji su to podaci koji saljemo
    let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // ubacivanjem immera ovde samo prosledimo knjigu koju smo definisali kao stanje
      body: JSON.stringify(knjiga),
    });
    console.log(response);
    if (response.ok) {
      //uspesno smo dodali knjigu, odgovor ok, ovde mozemo da proverimo i status i jos neke dodatne atribute koji se nalaze u response
      let d = await response.json();
      console.log(JSON.stringify(d));
      alert("Uspesno ste izmenili knjigu");
      // kada dodamo knjigu vracamo se na prikaz svih knjiga i za to koristimo programsku navigaciju
      navigate("/books");
    } else {
      console.log("Izmena knjige nije uspela");
    }
  };

  // proveravamo godinu, tako sto je gornja granica trenutna godina koju izvucemo iz datuma
  const checkYear = (year) => {
    // console.log('year ' + year);
    const now = new Date();
    const now_year = now.getFullYear();
    // console.log('full_year ' + now_year);

    if (year >= 1900 && year <= now_year) {
      setYearError("");
    } else {
      setYearError(
        `${errorMessageTemplate} valid year. Year should be in scope from 1900 to ${now_year}.`
      );
    }
  };

  // forma
  // u svakom input polju smo definisali onChange dogadjaj kako bismo pokupili podatke koje je korisnik uneo

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          "flex-direction": "column",
          "align-items": "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <FormControl sx={{width:'100%'}}> */}
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Book title"
          value={knjiga.title}
          helperText={titleError}
          error={titleError === "" ? false : true}
          name="title" //ovo dodajemo zbog izmene stanja objekta knjiga
          onChange={(e) => {
            // setTitle(e.target.value);
            // koristimo immer
            changeBook(e); // -> name=title => knjiga[e.target.name] = e.targer.value
            // knjiga[title] =
            if (e.target.value !== "") setTitleError("");
            else setTitleError(errorMessageTemplate + " title of the book.");
          }}
        />
        {/* </FormControl> */}

        {/* <FormControl sx={{ width: "100%" }}> */}
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-isbn-input"
          label="ISBN"
          value={knjiga.isbn}
          error={isbnError}
          helperText={isbnError}
          name="isbn"
          onChange={(e) => {
            // setIsbn(e.target.value);
            changeBook(e);
            console.log(JSON.stringify(e.target.value.match(/[0-9]{13}/)));
            if (e.target.value.match(/[0-9]{13}$/) == null)
              setIsbnError(
                errorMessageTemplate +
                  "valid ISBN. An ISB number is valid if it has 13 digits"
              );
            else setIsbnError("");
          }}
        />
        {/* </FormControl> */}
        {/* <FormControl sx={{ width: "100%" }}> */}
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-year-input"
          label="Year"
          value={knjiga.year}
          required
          type="number"
          error={yearError}
          name="year"
          helperText={yearError ? yearError : "Example: 1990, 2002, 2020..."}
          onChange={(e) => {
            // setYear(e.target.value);
            changeBook(e);
            checkYear(e.target.value);
          }}
        />
        {/* </FormControl> */}

        <FormControl
          component="div"
          sx={{
            width: "100%",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "5px",
          }}
        >
          <Typography>Rating</Typography>
          <Rating
            required
            name="rating"
            value={knjiga.rating}
            onChange={(event, newValue) => {
              // setRating(newValue);
              changeBook(event);
            }}
          />
        </FormControl>

        <FormControl
          sx={{ width: "100%", marginBottom: "15px" }}
          error={genreError}
        >
          <InputLabel id="demo-select-small-label">Genre</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="genre-select"
            label="Genre"
            required
            name="genre"
            onChange={(e) => {
              // setGenre(e.target.value);
              changeBook(e);
              if (e.target.value == 0) {
                setGenreError("Please select the genre");
              } else {
                setGenreError("");
              }
            }}
            value={knjiga.genre}
          >
            <MenuItem value="0">
              <em>None</em>
            </MenuItem>
            {genres.map((g) => (
              <MenuItem value={g.name}> {g.name} </MenuItem>
            ))}
          </Select>
          {/* select polje nema atribut helperText pa se koristi komponenta */}
          <FormHelperText>{genreError}</FormHelperText>
        </FormControl>

      {/* Omogucivanje da korisnik izabere vise autora i prikaz izabranih autora kako bi korisnik u svakom momentu znao koje autore je izabrao */}
        <FormControl sx={{ width: "100%" }} error={authorError}>
          <Stack direction="column">
            {/* kontrola koja prikazuje autore koje smo odabrali */}
            <Typography> Authors </Typography>
            {/* Autor 1     Autor 2 ... */}
            <Stack direction="row">
              {/* prikazemo sve autore za knjigu koju menjamo */}
              {knjiga.authors.map((a, ii) => (
                <Chip
                  label={a}
                  onDelete={() => {
                    const a = knjiga.authors.filter((v, i) => i != ii);
                    // setSelectedAuthors(a);
                    // posto radimo brisanje onda iz liste autora treba da izbrisemo odredjenog autora 
                    setKnjiga(produce((draft)=>{
                      draft.authors = a; //zameni samo listu autora, sve ostalo ostaje isto
                    } ))
                  }}
                />
              ))}
            </Stack>
            {/* kontrola iz koje biramo autore */}
            <Stack direction="row" sx={{ width: "100%" }}>
              <Autocomplete
              // prikazemo samo autore koji nisu vec izabrani tako da korisnik ne moze da nekog autora duplo izabere
                options={authors.filter((a) =>
                  knjiga.authors.every((vv) => vv != a.name)
                )}
                getOptionLabel={(a) => a.name}
                // kako ce biti podatak prikazan
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: "90%" }}
                value={selectedAuthor}
                onChange={(e, v) => {
                  // na svaku izmenu tj izbor nekog autora menja se selectedAuthor 
                  setSelectedAuthor(v);
                }}
              />
              <Button
              // dugme onemoguceno dok ne izaberemo autora
                disabled={selectedAuthor === null}
                onClick={() => {
                  // selektovanog autora ubacujemo u listu
                  console.log(selectedAuthor);
                  if (selectedAuthor != null) {
                    setKnjiga(
                      produce((draft) => {
                        //dodamo autora u listu svih autora koji su vezani za knjigu
                          draft.authors.push(selectedAuthor.name);
                      }
                      )
                    )
                    // posto smo autora dodali u listu autora onda on vise ne treba da bude izabran 
                    setSelectedAuthor(null); 
                  }
                }}
              >
                {" "}
                Add author{" "}
              </Button>
            </Stack>
          </Stack>
        </FormControl>
        {/* Kontrola koja je zakomentarisana je kontrola koju smo prvo koristili, promenili smo je zato sto smo kod nje mogli da izaberemo samo 1 autora */}
        {/* <FormControl sx={{ width: "100%" }} error={authorError}>
          <InputLabel id="select-author-label">Author</InputLabel>
          <Select
            labelId="select-author-label"
            id="author-select"
            label="Author"
            value={knjiga.authors.length == 0 ? 0 : knjiga.authors[0]}
            required
            onChange={(e) => {
              // setAuthor(e.target.value);
              setKnjiga(
                produce((draft) => {
                  if(knjiga.authors.length == 0){
                    knjiga.authors.push(e.target.value);
                  }else 
                    draft.authors[0] = e.target.value
                }
                )
              )
              if (e.target.value == 0) {
                setAuthorError("Please select the author");
              } else {
                setAuthorError("");
              }
            }}
          >
            <MenuItem value="0">
              <em>None</em>
            </MenuItem>
            {authors.map((a) => (
              <MenuItem value={a.name}> {a.name} </MenuItem>
            ))}
          </Select>
          <FormHelperText>{authorError}</FormHelperText>
        </FormControl> */}

        {/* dugme ce biti disabled sve dok korisnik ne ispravi sve greske koje ima */}
        <Button
          onClick={update}
          disabled={
            titleError || yearError || isbnError || authorError || genreError
          }
        >
          {" "}
          Save{" "}
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );
};

export default BookEdit;
