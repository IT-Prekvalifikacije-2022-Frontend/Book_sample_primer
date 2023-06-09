import { useState } from "react";
import "./author_form.css";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
const AuthorForm = () => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(""); //ovo cemo koristiti za prikaz greske ako je ime autora prazno
  const navigate = useNavigate();

  // funkcija za dodavanje novog autora
  const addNewAuthor = async () => {
    let response = await fetch("http://localhost:8080/api/v1/author", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    console.log(response);
    if (response.ok) {
      let d = await response.json();
      console.log(JSON.stringify(d, null, 4));
      navigate("/authors");
    } else {
      console.log("Neuspeh slanja!");
    }
  };
  return (
    <Container>
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
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Author name"
          placeholder="Author name"
          error={errorName === "" ? false : true}
          helperText={errorName}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value !== "") setErrorName("");
            else setErrorName("Please enter the name of the author.");
          }}
        />

        <Button onClick={addNewAuthor} disabled={name === ''}>
          {" "}
          Save{" "}
        </Button>
      </Box>
    </Container>
  );

  // pre mui-a
  // <div className='new-author-container' >
  //     <div className='form-container'>
  //         <div className="input-container">
  //                 <div className="search_button">Author name</div>
  //                 <input className='input-field' type="text" value={txt} onChange={(e) => {
  //                     setTxt(e.target.value);
  //                 }}/>
  //         </div>
  //         <button className='save_btn' onClick={addNewAuthor}>Save</button>
  //     </div>
  // </div>
};

export default AuthorForm;
