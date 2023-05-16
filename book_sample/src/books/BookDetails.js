import { useLoaderData } from "react-router-dom"

const BookDetails = () => {
    const book = useLoaderData();

    return <div>
        {JSON.stringify(book, null, 4)} 
        </div> 
}

export default BookDetails;