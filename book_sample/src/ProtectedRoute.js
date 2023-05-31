//  props -> 
// <Book id='1'/>
// <Book> 1 </Book>

const { Fragment } = require("react");
const { useState } = require("react");
const { useEffect } = require("react");
const { useNavigate } = require("react-router-dom");

// <ProtectedRoute> <Book/> </ProtectedRoute>
const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const [isLoggedUser, setLoggedUser] = useState(false);


    const checkUser = () => {
        const user = localStorage.getItem('user');
        if(!user || user === undefined){
            //niko nije ulogovan i ne sme da se otvori odredjena stranica
            setLoggedUser(false);
            // return navigate('/');
            const err = {
                cause: "security",
                message: "Korisnik nema pravo pristupa"
            };
            throw err;
        }
        setLoggedUser(true);
    }

    useEffect(() => {
        checkUser();
    }, [isLoggedUser])

    return <Fragment>
        {isLoggedUser ? children : null}
    </Fragment>
}

export default ProtectedRoute;