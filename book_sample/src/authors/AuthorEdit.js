import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

const AuthorEdit = () => {
  const author = useLoaderData(); // autor kojeg menjamo, mozemo da menjamo samo ime autora, ali uradicemo preko imera
//   ako hocete da koristite useImmer onda treba da se instalira i use-immer pomocu komande npm install use-immer
  const [edit_author, setEditAuthor] = useImmer(author);
  const [errorName, setErrorName] = useState(""); //ovo cemo koristiti za prikaz greske ako je ime autora prazno
  const navigate = useNavigate();

  // funkcija za izmenu autora
  const authorEdit = async () => {
    let response = await fetch(`http://localhost:8080/api/v1/author/${edit_author.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit_author),
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
          value={edit_author.name}
          error={errorName === "" ? false : true}
          helperText={errorName}
          onChange={(e) => {
            // posto koristimo useImmer onda nam ne treba produce
            setEditAuthor((draftState) => {
                draftState.name = e.target.value;
            });
            if (e.target.value !== "") setErrorName("");
            else setErrorName("Please enter the name of the author.");
          }}
        />

        <Button onClick={authorEdit} disabled={authorEdit.name === ''}>
          {" "}
          Save{" "}
        </Button>
      </Box>
    </Container>
  );
}

export default AuthorEdit;