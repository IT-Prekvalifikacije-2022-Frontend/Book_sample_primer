import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Rating, Select, TextField, Typography } from "@mui/material";
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

  // posto menjamo knjigu onda ce pocetne vrednosti biti vrednosti za tu knjigu
  const [title, setTitle] = useState(book.title);
  const [isbn, setIsbn] = useState(book.isbn);
  const [year, setYear] = useState(book.year);
  const [rating, setRating] = useState(book.rating);
  const [genre, setGenre] = useState(book.genre);
  const [author, setAuthor] = useState(book.authors[0]);

  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Please enter the ";
  // ova stanja ce da budu strigovi koje cemo iskoristiti i kao poruku i kao naznaku da postoji greska
  const [titleError, setTitleError] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [yearError, setYearError] = useState("");
  const [genreError, setGenreError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const update = async () => {
    // dodavanje nove knjige
    // atribut: vrednost
    // new_book je objekat koji cemo proslediti serveru, izgled objekta je definisan na strani servera i imena atributa moraju da se poklapaju sa imenima atributa na serveru

    // ovde cemo za svaki slucaj da proverimo da li je korisnik uneo sve podatke ako nije ispisacemo mu poruku
    if (title == "" || isbn == "" || year == "" || genre == 0 || author == 0) {
      // dodacu novo stanje koje ce mi samo ovde sluziti i to je globalna greska da korisnik nije popunio nista u formi
      setGlobalError("Please fill all fields in the form");
      return; // ne smem da dodam knjigu
    }

    const new_book = {
      title: title,
      isbn: isbn,
      year: year,
      rating: rating,
      genre: genre,
      authors: [author],
    };
    // posto je PUT zahtev onda fetch funkciji pored url/a prosledjujemo i dodatne podatke kao sto su metod, zaglavlje u kojem definisemo kakve podatke saljemo i body gde definisemo koji su to podaci koji saljemo
    let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_book),
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
          value={title}
          helperText={titleError}
          error={titleError === "" ? false : true}
          onChange={(e) => {
            setTitle(e.target.value);
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
          value={isbn}
          error={isbnError}
          helperText={isbnError}
          onChange={(e) => {
            setIsbn(e.target.value);
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
          value={year}
          required
          type="number"
          error={yearError}
          helperText={yearError ? yearError : "Example: 1990, 2002, 2020..."}
          onChange={(e) => {
            setYear(e.target.value);
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
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
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
            onChange={(e) => {
              setGenre(e.target.value);
              if (e.target.value == 0) {
                setGenreError("Please select the genre");
              } else {
                setGenreError("");
              }
            }}
            value={genre}
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

        <FormControl sx={{ width: "100%" }} error={authorError}>
          <InputLabel id="select-author-label">Author</InputLabel>
          <Select
            labelId="select-author-label"
            id="author-select"
            label="Author"
            value={author}
            required
            onChange={(e) => {
              setAuthor(e.target.value);
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
        </FormControl>

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
