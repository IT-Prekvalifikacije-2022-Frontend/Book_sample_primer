import logo from "./logo.svg";
// import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import { Box,  CssBaseline,  Divider,  Drawer,   FormControl,   FormControlLabel,   FormGroup,   IconButton,  List,  ListItem,  ListItemButton,  ListItemText,  Switch,  Toolbar,  Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from '@mui/material/AppBar';

import {
  ThemeProvider,
  styled,
  useTheme,
  createTheme,
} from "@mui/material/styles";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";

// import { ThemeProvider } from 'styled-components';
/*
Ova komponenta predstavlja 'pocetnu stranicu' za nasu aplikaciju posto smo definisali da ce njen sadrzaj da se prikaze kada pokrenom aplikaciju (path='/'). Na ovoj stranici ce biti prikazan navbar sa leve strane i on ce uvek da bude prikazani, nece se menjati kada izaberemo neku opciju tj uvek ce biti prisutan na ekranu. Pored navbara ostatak prostora ce zauzimati kontrola koja se zove <Outlet> i ona sluzi da se prikazuje sadrzaj u zavisnosti od rute na kojoj se nalazimo, a rute smo definisali u children atributu (ugnjezdene rute). 
*/

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const theme = useTheme();

  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    }
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })


  const handlerDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const handleThemeChange = () => {
    setDarkMode(!isDarkMode);
  }

  return   <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={openDrawer}>
    <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
          onClick={handlerDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Library
        </Typography>
        <FormGroup> 
          <FormControlLabel control={<Switch checked={isDarkMode} onChange={handleThemeChange} />} label="Dark mode"/>
        </FormGroup>
      </Toolbar>
    </AppBar>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={openDrawer}
    >
      <DrawerHeader>
        <IconButton onClick={handlerDrawer}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
          <ListItem disablePadding component={NavLink} to="books">
            <ListItemButton >
              <ListItemText primary="Books" />
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding component={NavLink} to="authors">
            <ListItemButton>
              <ListItemText primary="Authors" />
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding component={NavLink} to="genres">
            <ListItemButton>
              <ListItemText primary="Genres" />
            </ListItemButton>
          </ListItem>
          <Divider/>
        </List>
    </Drawer>
    <Main open={openDrawer}>
      <DrawerHeader />
      <Outlet>

      </Outlet>
    </Main>
  </Box>
</ThemeProvider>
    
  // PRE UBACIVANJA MUI-A
  // <div className="container">
  //     <header className='container_header'>
  //       <div> </div>
  //     </header>
  //     <aside className='sidenav_container'>
  //       <ul className='sidenav_list'>
  //       {/* Navbar sa strane i u okviru njega se nalaze stavke menija, kada izaberemo neku od stavki menja nam se sadrzaj u elementu Outlet i to sve iz razloga sto smo upotrebili NavLink elemente koji nas prebacuju na putanju koju smo definisali u atributu to, ovde u nasem slucaju ovo su sve putanje koje smo definisali u ruteru kao ugnjezdene tako da klikom na neku od ovih opcija prikazace nam se odredjena komponenta */}
  //           <li className='sidenav_list_item'>
  //              <NavLink className='sidenav_list_item_navlink' to='books'> Books </NavLink> </li>
  //           <li className='sidenav_list_item'>
  //             <NavLink className='sidenav_list_item_navlink' to='authors'>Authors</NavLink></li>
  //           <li className='sidenav_list_item'>
  //             <NavLink className='sidenav_list_item_navlink' to='genres'>Genres</NavLink></li>
  //       </ul>
  //     </aside>
  //     {/* element u kojem nam se prikazuju komponente koje smo definisali da su ugnjezdene */}
  //     <Outlet></Outlet>
  //   </div>
  
}

export default App;
