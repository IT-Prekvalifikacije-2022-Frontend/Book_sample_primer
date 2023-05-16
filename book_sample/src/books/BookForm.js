import { useState } from 'react';
import './book_form.css';
import { useLoaderData, useNavigate } from 'react-router-dom';

// komponenta koja predstavlja formu za dodavanje nove knjige 
const BookForm = () => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');

    // kada unosimo novu knjigu treba da iz ponudjene liste zanrova i autora izaberemo vrednost, zato moramo ucitati podatke prilikom prikazivanja komponente
    // u loaderu smo definisali da vraca niz u kojem je prvi element autori, a drugi zanrovi
    const loader_data = useLoaderData(); // [authors, genres] 
    const genres = loader_data[1];
    const authors = loader_data[0];
    // useNavigate je hook u sklopu react-router-dom biblioteke i sluzi za programsku navigaciju u aplikaciji
    const navigate = useNavigate();

    const save = async () => {
        // dodavanje nove knjige
        // atribut: vrednost
        // new_book je objekat koji cemo proslediti serveru, izgled objekta je definisan na strani servera i imena atributa moraju da se poklapaju sa imenima atributa na serveru
        const new_book = {
            'title': title, 
            'isbn': isbn,
            'year': year,
            'rating': rating, 
            'genre': genre,
            'authors': [author]
        };
        // posto je POST zahtev onda fetch funkciji pored url/a prosledjujemo i dodatne podatke kao sto su metod, zaglavlje u kojem definisemo kakve podatke saljemo i body gde definisemo koji su to podaci koji saljemo
        let response = await fetch('http://localhost:8080/api/v1/book', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_book)
        });
        console.log(response);
        if(response.ok){
            //uspesno smo dodali knjigu, odgovor ok, ovde mozemo da proverimo i status i jos neke dodatne atribute koji se nalaze u response
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert('Uspesno ste dodali novu knjigu');
            // kada dodamo knjigu vracamo se na prikaz svih knjiga i za to koristimo programsku navigaciju
            navigate('/books');

        }else {
            console.log('Dodavanje nove knjige nije uspelo')
        }
    }


    // forma 
    // u svakom input polju smo definisali onChange dogadjaj kako bismo pokupili podatke koje je korisnik uneo

    return <div className='form_container'> 
        {/* title */}
        <div className='input_container'> 
            <div className='label'> Book title </div>
            <input className='input_field' type="text" placeholder='Book title'  value={title} onChange={(e)=> setTitle(e.target.value)}/>
        </div>
        {/* isbn */}
        <div className='input_container'> 
            <div className='label'> ISBN </div>
            <input className='input_field' type="text" value={isbn} onChange={(e)=> setIsbn(e.target.value)} />
        </div>
        {/* year */}
        <div className='input_container'> 
            <div className='label'> Year </div>
            <input className='input_field' type="text" value={year} onChange={(e)=> setYear(e.target.value)} />
        </div>
        {/* rating */}
        <div className='input_container'> 
            <div className='label'> Rating </div>
            {/* dodata validacija da rating moze da bude samo broj od 0 do 10, validacija se radi kada polje izgubi fokus */}
            <input className='input_field' type="number" min={0} max={10} value={rating} onChange={(e)=>setRating(e.target.value)} onBlur={(e) => {
                if (rating > 10) {
                    // alert('Uneli ste vrednost koja nije odgovarajuca');
                    setRating(10);
                } else if(rating < 0){
                    setRating(0);
                }
                } } />
        </div>
        {/* genre */}
        <div className='input_container' >
            <div className='label'> Genre </div>
            <select className='input_field' onChange={(e) => setGenre(e.target.value)}>
                {genres.map((g) => <option value={g.name}> {g.name}</option>)}
            </select>
        </div>
        
        {/* author */}
        <div className='input_container'> 
            <div className='label'> Author </div>
            <select className='input_field'  onChange={(e)=> setAuthor(e.target.value)}> 
                {authors.map((a)=> <option value={a.name}>{a.name}</option>)}
            </select>
        </div>

        <button className='save_btn' onClick={save}> Save </button>
     
    </div>
}

export default BookForm;