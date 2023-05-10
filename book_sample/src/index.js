import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ShowBooks from './books/ShowBooks';
import ShowAuthors from './authors/ShowAuthors';
import ShowGenres from './genre/ShowGenres';

// 1. definisete rute
// 2. render zamenite App sa RouterProvider-om
// 3. navigirate do neke stranice, upotrebite NavLink sa atributom to


// kreiramo ruter, odnosno odredimo koja komponenta ce da se prikaze na kojoj putanje
// funkcija createBrowserRouter se nalazi u biblioteci react-router-dom i neophodno je prvo da instaliramo tu biblioteku
/* ova funkcija prima listu ruta, tj objekata koje definisemo upotrebom JSON notacije, svaki objekat obavezno mora da ima atribute:
    - path - oznacava putanju 
    - element - oznacava komponentu ili html element koji treba da se prikaze na putanji koja je navedena; 
  opcioni atributi su: 
    - children - lista objekata koji predstavljaju rutu i koristi se kada imamo ugnjezdene rute, tj kada hocemo da se jedan deo stranice menja a drugi ne, kao sto je slucaj kod nas u aplikaciji (navbar sa strane je nepromenljiv, a promenljiv deo je glavni deo ekrana)
    - loader - dobavljanje podataka pre ucitavanja komponente, zamena za dobavljanje podataka upotrebom hook-a useEffect; uz ovo se obavezno koristi hook useLoaderData i on se koristi u komponenti kako bi preuzeli podatake koje nam dobavi loader

*/
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path:'books',  // /books
        element: <ShowBooks/>,
        loader: async () => {
          return fetch('http://localhost:8080/api/v1/book')
        },
      },
      {
        path:'/authors',
        element:<ShowAuthors/>,
        loader: async () => {
          return fetch('http://localhost:8080/api/v1/author')
        },
      },
      {
        path:'/genres',
        element:<ShowGenres/>
      }
    ]
  }, 

])
/* 
Posto pravimo Single Page Application (SPA) onda imamo samo jedan html fajl u kojem mi na osnovu neke logike menjamo sadrzaj. 
Promenljiva root predstavlja div element koji je kreiran u index.html fajlu i u okviru njega ce se prikazati komponente koje mi pravimo. Render funkcija sluzi za iscrtavanje elemenata u okviru nekog drugog elementa. Ovde u nasem slucaju iscrtavamo ruter odnosno prosledimo ruter ali na osnovu putanja koje smo kreirali ruter ce znati koju komponentu treba da prikaze u div/u. Kada se pokrene aplikacija prikazace se komponenta App posto smo rekli da se ona prikazuje na pocetnoj putanji (path='/')
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
