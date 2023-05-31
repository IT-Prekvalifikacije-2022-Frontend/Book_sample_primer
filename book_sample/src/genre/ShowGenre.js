import { Box, Divider, IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// komponenta za prikaz jendog zanra
const ShowGenre = ({genre, onDelete}) => {

    const deleteGenre = async () =>  {
        // brisanje zanra
    // koristimo fetch funkciju kako bi se obratili serveru i gadjamo endpoint za brisanje zanra
    // posto je zahtev delete onda to moramo i naznaciti dodavanje metoda
    let response = await fetch(`http://localhost:8080/api/v1/genre/${genre.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // proverimo odgovor koji smo dobili od servera i na osnovu toga odradimo sta zelimo
      if (response.ok) {
        let d = await response.json();
        console.log("uspesno obrisan zanr");
        onDelete(genre.id);
      } else {
        console.log("greska prilikom brisanja zanra");
      }
    }

    return <> <ListItem secondaryAction= {
       <Box edge='end' sx={{display: 'flex', gap: '5px'}}>        
        {/* <IconButton aria-label='edit'>
            <EditIcon/>
        </IconButton> */}

        <IconButton edge='end' aria-label="delete" onClick={deleteGenre}>
            <DeleteIcon/>
        </IconButton>
       </Box>       
    } > 
        <ListItemText primary={genre.name}/>

    </ListItem>
    <Divider/>
    </>
}

export default ShowGenre;