import { useLoaderData } from "react-router-dom";

const BookDetails = () => {
    const book = useLoaderData();

    return  <div className="book_overview">
                <div > <p className="book_title">{book.title} </p></div>
                <div className="book_info">
                    <div className="book_authors">{book.authors}</div>
                    <div className="book_year">Year: {book.year}</div>
                    <div className="book_isbn">ISBN: {book.isbn}</div>
                    <div className="book_genre">Genre: {book.genre}</div>
                    <div className="book_rating">Rating: {book.rating}</div>
                </div>
            </div>  
}

export default BookDetails;