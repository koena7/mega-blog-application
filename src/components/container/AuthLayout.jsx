import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AuthLayout({children, authRequired = true}) {

    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.loggedIn)
    const navigate = useNavigate();

    useEffect(()=>{
        console.log('loading auth')
    },[])

    useEffect(() => {
        if(authRequired == true  && authStatus !== authRequired){
            navigate('/login')
        }else if(authRequired == false && authStatus !== authRequired){
            navigate('/')
        }
        setLoader(false)
    }, [authRequired, authStatus, navigate]);
    
    return (
        <>
            {loader ? (<div>Loading...</div>) : <>{children}</>}
        </>
    )
}

export default AuthLayout;