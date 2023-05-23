import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, TextField } from "@mui/material"
import { useState } from "react";


// roditelj -> dete => props -> atribut=vrednost
// roditelj <- dete => funkcije

const LoginModal  = ({show, handleCloseModal}) => {
    const [open, setOpen] = useState(show); 
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();


    const closeModal = () => {
        setOpen(false);
        handleCloseModal(); //f-ja koja se nalazi u roditelju odnosno u APP komponenti, promenicemo stanje da se modal ne prikazuje
    }

    const loginUser = () => {
        if(username === "test@gmail.com" && password === "test"){
            // korisnik ulogovan 
            localStorage.setItem("user", JSON.stringify({
                username : "Test", 
                name: "Pera",
                surname: "Peric"
            }));

            // pozove back-end, na osnovu odgovara koji back-end vrati odredjujemo da li se neko ulogovao ili ne 

            closeModal();
        }else {
            setErrorMessage("Wrong username or password");
        }
    }

    return <Dialog open={open}>
        <DialogTitle> Login </DialogTitle>
        <DialogContent>
            <Box sx={{display: "flex", flexDirection:"column", gap: "10px", margin: "10px"}}> 
                <TextField
                    required placeholder="Username" label='Username'
                    onChange={(e)=>setUsername(e.target.value)}
                    sx={{width:'100%'}}/>
                
                <TextField
                    required placeholder="Password" label='Password'
                    onChange={(e)=>setPassword(e.target.value)}
                    sx={{width:'100%'}} type='password'/>

                <FormHelperText error={errorMessage}> {errorMessage}</FormHelperText>
            </Box>

        </DialogContent>
        <DialogActions>
            <Button onClick={loginUser}> Login </Button>
            <Button onClick={closeModal}> Cancel </Button>
        </DialogActions>
    </Dialog>

}

export default LoginModal;