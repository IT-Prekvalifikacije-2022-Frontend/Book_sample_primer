import './show_book.css'

/* 
Komponenta za prikaz jedne knjige, kao parametar prima knjigu koju treba da prikaze. Poziva se iz ShowBooks komponente. 
*/
const ShowBook = ({book}) => {
    return <div className='book_card'> 
                {/* naslov knjige  */}
                <div className='book_title_container'>
                    <p className='book_title'> {book.title} </p>
                </div>
                {/* informacije */}
                <div className='book_info'> 
                    <div> {book.authors} </div>
                    <div> {book.year} </div>
                    <div> {book.isbn} </div>
                    <div> {book.genre} </div>
                    <div> {book.rating} </div>
                </div>
           </div>
}


export default ShowBook;