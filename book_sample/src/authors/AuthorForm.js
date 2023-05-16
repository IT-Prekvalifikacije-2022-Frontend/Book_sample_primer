import { useState } from "react";
import './author_form.css';
import { useNavigate } from "react-router-dom";
const AuthorForm = () => {
    const [txt, setTxt] = useState("");
    const navigate = useNavigate();

    const addNewAuthor = async () => {
            let response = await fetch("http://localhost:8080/api/v1/author", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: txt
                }),
            });
            console.log(response);
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
                navigate('/authors');
            }else{
                console.log("Neuspeh slanja!");
            }
    }
    return <div className='new-author-container' >
        <div className='form-container'>
            <div className="input-container">            
                    <div className="search_button">Author name</div> 
                    <input className='input-field' type="text" value={txt} onChange={(e) => {
                        setTxt(e.target.value);
                    }}/> 
            </div>
            <button className='save_btn' onClick={addNewAuthor}>Save</button>
        </div>
    </div>
}

export default AuthorForm;