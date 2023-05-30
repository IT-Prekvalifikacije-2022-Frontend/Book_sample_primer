import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Rating,
  Select,
  TextField,
  Typography,
  Container,
  FormHelperText,
  Stack,
  Chip,
  Autocomplete
} from "@mui/material";
import { useState } from "react";
// import './book_form.css';
import { useLoaderData, useNavigate } from "react-router-dom";

// komponenta koja predstavlja formu za dodavanje nove knjige
const BookForm = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null); 

  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Please enter the ";
  // ova stanja ce da budu strigovi koje cemo iskoristiti i kao poruku i kao naznaku da postoji greska
  const [titleError, setTitleError] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [yearError, setYearError] = useState("");
  const [genreError, setGenreError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  // kada unosimo novu knjigu treba da iz ponudjene liste zanrova i autora izaberemo vrednost, zato moramo ucitati podatke prilikom prikazivanja komponente
  // u loaderu smo definisali da vraca niz u kojem je prvi element autori, a drugi zanrovi
  const loader_data = useLoaderData(); // [authors, genres]
  const genres = loader_data[1];
  const [authors, setAuthors] = useState(loader_data[0]);
  // useNavigate je hook u sklopu react-router-dom biblioteke i sluzi za programsku navigaciju u aplikaciji
  const navigate = useNavigate();

  const save = async () => {
    // dodavanje nove knjige
    // atribut: vrednost
    // new_book je objekat koji cemo proslediti serveru, izgled objekta je definisan na strani servera i imena atributa moraju da se poklapaju sa imenima atributa na serveru

    // ovde cemo za svaki slucaj da proverimo da li je korisnik uneo sve podatke ako nije ispisacemo mu poruku
    if (title == "" || isbn == "" || year == "" || genre == 0 || selectedAuthors.size == 0) {
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
      authors: selectedAuthors,
    };
    // posto je POST zahtev onda fetch funkciji pored url/a prosledjujemo i dodatne podatke kao sto su metod, zaglavlje u kojem definisemo kakve podatke saljemo i body gde definisemo koji su to podaci koji saljemo
    let response = await fetch("http://localhost:8080/api/v1/book", {
      method: "POST",
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
      alert("Uspesno ste dodali novu knjigu");
      // kada dodamo knjigu vracamo se na prikaz svih knjiga i za to koristimo programsku navigaciju
      navigate("/books");
    } else {
      console.log("Dodavanje nove knjige nije uspelo");
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
          placeholder="Book title"
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
          placeholder="ISBN"
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
          placeholder="Year"
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
          <Stack direction="column">
            {/* kontrola koja prikazuje autore koje smo odabrali */}
            <Typography> Authors </Typography>
            {/* Autor 1     Autor 2 ... */}
            <Stack direction='row'>
              {
                selectedAuthors.map((a, ii) => <Chip 
                  label={a}
                   onDelete={() =>{
                    const a = selectedAuthors.filter((v, i) => i != ii);
                    setSelectedAuthors(a);
                  }                    
                  }
                />)
              }
            </Stack>
            {/* kontrola iz koje biram autore */}
            <Stack direction='row' sx={{width: '100%'}}>
              <Autocomplete options={
                authors.filter(a => selectedAuthors.every(vv => vv != a.name))} 
              getOptionLabel={a => a.name}
            renderInput={(params) => <TextField {...params}/>} 
            sx={{width: '90%'}}
            value={selectedAuthor}
             onChange={(e, v) => {setSelectedAuthor(v)} } />
              <Button disabled={selectedAuthor === null}
              onClick={() => {
                // selektovanog autora ubacujemo u listu
                console.log(selectedAuthor);
                if(selectedAuthor != null){
                  let a = selectedAuthors;
                  a.push(selectedAuthor.name);
                  setSelectedAuthors(a);
                  setSelectedAuthor(null);
                }
              }}
              > Add author </Button>
            </Stack>
            
          </Stack>
{/* 
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
          <FormHelperText>{authorError}</FormHelperText> */}
        </FormControl>

        {/* dugme ce biti disabled sve dok korisnik ne ispravi sve greske koje ima */}
        <Button
          onClick={save}
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

  // PRE UBACIVANJA MUI-A
  // <div className='form_container'>
  //     {/* title */}
  //     <div className='input_container'>
  //         <div className='label'> Book title </div>
  //         <input className='input_field' type="text" placeholder='Book title'  value={title} onChange={(e)=> setTitle(e.target.value)}/>
  //     </div>
  //     {/* isbn */}
  //     <div className='input_container'>
  //         <div className='label'> ISBN </div>
  //         <input className='input_field' type="text" value={isbn} onChange={(e)=> setIsbn(e.target.value)} />
  //     </div>
  //     {/* year */}
  //     <div className='input_container'>
  //         <div className='label'> Year </div>
  //         <input className='input_field' type="text" value={year} onChange={(e)=> setYear(e.target.value)} />
  //     </div>
  //     {/* rating */}
  //     <div className='input_container'>
  //         <div className='label'> Rating </div>
  //         {/* dodata validacija da rating moze da bude samo broj od 0 do 10, validacija se radi kada polje izgubi fokus */}
  //         <input className='input_field' type="number" min={0} max={10} value={rating} onChange={(e)=>setRating(e.target.value)} onBlur={(e) => {
  //             if (rating > 10) {
  //                 // alert('Uneli ste vrednost koja nije odgovarajuca');
  //                 setRating(10);
  //             } else if(rating < 0){
  //                 setRating(0);
  //             }
  //             } } />
  //     </div>
  //     {/* genre */}
  //     <div className='input_container' >
  //         <div className='label'> Genre </div>
  //         <select className='input_field' onChange={(e) => setGenre(e.target.value)}>
  //             {genres.map((g) => <option value={g.name}> {g.name}</option>)}
  //         </select>
  //     </div>

  //     {/* author */}
  //     <div className='input_container'>
  //         <div className='label'> Author </div>
  //         <select className='input_field'  onChange={(e)=> setAuthor(e.target.value)}>
  //             {authors.map((a)=> <option value={a.name}>{a.name}</option>)}
  //         </select>
  //     </div>

  //     <button className='save_btn' onClick={save}> Save </button>

  // </div>
};

export default BookForm;
