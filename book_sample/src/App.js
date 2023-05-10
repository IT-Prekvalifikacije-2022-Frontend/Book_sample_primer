import logo from './logo.svg';
import './App.css';
import { NavLink, Outlet } from 'react-router-dom';

/*
Ova komponenta predstavlja 'pocetnu stranicu' za nasu aplikaciju posto smo definisali da ce njen sadrzaj da se prikaze kada pokrenom aplikaciju (path='/'). Na ovoj stranici ce biti prikazan navbar sa leve strane i on ce uvek da bude prikazani, nece se menjati kada izaberemo neku opciju tj uvek ce biti prisutan na ekranu. Pored navbara ostatak prostora ce zauzimati kontrola koja se zove <Outlet> i ona sluzi da se prikazuje sadrzaj u zavisnosti od rute na kojoj se nalazimo, a rute smo definisali u children atributu (ugnjezdene rute). 
*/


function App() {
  return (
    <div className="container">
      <header className='container_header'>
        <div> </div>
      </header>
      <aside className='sidenav_container'>
        <ul className='sidenav_list'> 
        {/* Navbar sa strane i u okviru njega se nalaze stavke menija, kada izaberemo neku od stavki menja nam se sadrzaj u elementu Outlet i to sve iz razloga sto smo upotrebili NavLink elemente koji nas prebacuju na putanju koju smo definisali u atributu to, ovde u nasem slucaju ovo su sve putanje koje smo definisali u ruteru kao ugnjezdene tako da klikom na neku od ovih opcija prikazace nam se odredjena komponenta */}
            <li className='sidenav_list_item'>
               <NavLink className='sidenav_list_item_navlink' to='books'> Books </NavLink> </li>
            <li className='sidenav_list_item'> 
              <NavLink className='sidenav_list_item_navlink' to='authors'>Authors</NavLink></li>
            <li className='sidenav_list_item'> 
              <NavLink className='sidenav_list_item_navlink' to='genres'>Genres</NavLink></li>
        </ul>
      </aside>
      {/* element u kojem nam se prikazuju komponente koje smo definisali da su ugnjezdene */}
      <Outlet></Outlet>
    </div>
  );
}

export default App;
