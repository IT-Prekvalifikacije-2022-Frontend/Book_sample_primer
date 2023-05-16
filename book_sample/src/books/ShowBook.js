import { useNavigate } from 'react-router-dom';
import './show_book.css'

/* 
Komponenta za prikaz jedne knjige, kao parametar prima knjigu koju treba da prikaze. Poziva se iz ShowBooks komponente. 
*/
const ShowBook = ({book}) => {
    const navigate = useNavigate();

    const deleteBook = async () => {
        // brisanje knjige
        // koristimo fetch funkciju kako bi se obratili serveru i gadjamo endpoint za brisanje knjige
        // posto je zahtev delete onda to moramo i naznaciti dodavanje metoda 
        let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // proverimo odgovor koji smo dobili od servera i na osnovu toga odradimo sta zelimo
        if(response.ok){
            let d = await response.json();
            console.log('uspesno obrisana knjiga');
        }else {
            console.log('greska priikom brisanja');
        }
    }

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
                <div>
                    {/* 3 dugmeta za prikaz jedne knjige, izmenu i brisanje */}
                    {/* prikaz knjige, klikom na ovo dugme otvara se nova stranica na kojoj treba da se prikaze odredjena knjiga - funkcija navigate (programska navigacija u app) - prebacuje nas na odredjenu putanju koju smo definisali u ruteru  */}
                    <button className='new_btn' onClick={()=> navigate(`book/${book.id}`)}> Book details </button>
                    <button className='new_btn'> Edit </button>
                    {/* brisanje knjige, klikom na ovo dugme dolazi do poziva funkcije deleteBook u kojoj je implementirana logika za brisanje knjige */}
                    <button className='new_btn' onClick={deleteBook}> Delete </button>
                </div>
           </div>
}


export default ShowBook;