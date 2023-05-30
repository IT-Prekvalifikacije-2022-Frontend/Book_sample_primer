// import './show_author.css';
import { Card, CardHeader, CardContent, ListItem, CardActions, Tooltip, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

// props = {author, onDelete}
const ShowAuthor = ({ author, onDelete }) => {
  const navigate = useNavigate();

  const deleteAuthor = async () => {
    // obratimo se back/endu kako bi izbrisali autora
    const res = await fetch(`http://localhost:8080/api/v1/author/${author.id}`, {
      method: 'DELETE'
    });
    if(res.ok){
      const result = await res.json();
      console.log('Autor je izbrisan');
      onDelete(author.id);
    } else {
      console.log('Doslo je do greske prilikom brisanja autora');
    }
  }
  return <Card sx={{ marginBottom: 3 }} variant="outlined"> 
      <CardHeader sx={{textAlign: 'center', backgroundColor: '#ccc'}} title={author.name}>  </CardHeader>
      <CardContent> 
        {author.books.map(b => <ListItem> {b.title}</ListItem> )}</CardContent>

      <CardActions sx={{display: 'flex', justifyContent: 'end'}}> 
      <Tooltip title="Info">
            <IconButton
              aria-label="info"
              onClick={() => navigate(`author/${author.id}`)}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => navigate(`edit_author/${author.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteAuthor}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
      </CardActions>
      </Card>
  
  

  // OVO JE PRE UBACIVANJA MUI KOMPONENTE
//   (
//     <div className="author_overviewcard">
//       <div className="author_title_container">
//         <p className="author_title">{author.name} </p>
//       </div>
//       <div className="author__info">
//         {author.books.map((a) => (
//           <span>{a.title}</span>
//         ))}
//       </div>
//     </div>
//   );
};


export default ShowAuthor;