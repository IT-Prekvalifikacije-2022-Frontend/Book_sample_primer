import { useLoaderData, useNavigate } from "react-router-dom";
import ShowAuthor from "./ShowAuthor";
import './show_authors.css'
const ShowAuthors = () => {
    const authors = useLoaderData();
    const navigation = useNavigate();

    return <div className='authors_container'> 
    {/* search part */}
        <header className="authors_container_header">
            <div class="author_input-container">
                <input className='author_input-field' type="text" placeholder="Search..." />
                <button className="author_search_button">Search</button>  
            </div>
            <button className='add_btn' onClick={()=>{navigation('add_new')}}>Add New Author</button>
        </header>
        <div className="container_show_authors">
                {authors.map((a) => <ShowAuthor author={a}/>)}
        </div>
     </div>
}

export default ShowAuthors;