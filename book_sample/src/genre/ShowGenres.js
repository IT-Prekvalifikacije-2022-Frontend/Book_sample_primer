import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import './show_genres.css'
const ShowGenres = () => {
    const genres = useLoaderData();
    const navigate = useNavigate();

    return <div> 
    {/* search part */}
        <header className="books_container_header">
            <div class="genre_input-container">
                <input className='genre_input-field' type="text" placeholder="Search..." />
                <button className="genre_search_button">Search</button>  
            </div>
            <button className='add_btn' onClick={()=>navigate('add_new')}>Add New Genre</button>
        </header>
        <div className="container_show_genres">
            <ul className="genres_overviewcard">
            {genres.map((g) => <li className="genre_item">{g.name}</li>)}
            </ul>
                
        </div>
     </div>
}

export default ShowGenres;