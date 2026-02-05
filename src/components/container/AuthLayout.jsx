import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AuthLayout({children, authentication = true}) {

    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.loggedIn)
    const navigate = useNavigate();

    useEffect(() => {
        if(authentication == true  && authStatus !== authentication){
            navigate('/login')
        }else if(authentication == false && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    }, [authentication, authStatus, navigate]);
    
    return (
        <>
            {Loader ? (<div>Loading...</div>) : {children}}
        </>
    )
}

export default AuthLayout;