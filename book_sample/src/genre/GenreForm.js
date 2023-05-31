import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenreForm = () => {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState('');
    const navigate = useNavigate();

    const addNewGenre = async () => {
            let response = await fetch("http://localhost:8080/api/v1/genre", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name
                }),
            });
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
                navigate('/genres');
            }else{
                console.log("Neuspelo slanje!");
            }
    }
    return  <Container>
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
        label="Genre"
        placeholder="Genre"
        error={errorName === "" ? false : true}
        helperText={errorName}
        onChange={(e) => {
          setName(e.target.value);
          if (e.target.value !== "") setErrorName("");
          else setErrorName("Please enter the name of the genre.");
        }}
      />

      <Button onClick={addNewGenre} disabled={name === ''}>
        {" "}
        Save{" "}
      </Button>
    </Box>
  </Container>
    
    // pre mui-a 
    // <div className='new-genre-container' >
    //     <div className='form-container'>
    //         <div className="input-container">            
    //                 <div className="search_button">Genre name</div> 
    //                 <input className='input-field' type="text" value={txt} onChange={(e) => {
    //                     setTxt(e.target.value);
    //                 }}/> 
    //         </div>
    //         <button className='save_btn' onClick={addNewGenre}>Save</button>
    //     </div>
    // </div>
}

export default GenreForm;