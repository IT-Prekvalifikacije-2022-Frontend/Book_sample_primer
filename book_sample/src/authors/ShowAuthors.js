import { useLoaderData } from "react-router-dom";

const ShowAuthors = () => {
    const authors = useLoaderData();
    return <div> <h1> Authors </h1>
        <div> 
            <ol> 
                {authors.map((a)=> <li> {a.name} </li>)}
            </ol>
        </div>
    </div>
}

export default ShowAuthors;