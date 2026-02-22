import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dbService from "../appwrite-services/DatabaseService";

function HomePage() {

    const userLoggedIn = useSelector((state) => state.auth.loggedIn)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        console.log("in home page, logged in: ",userLoggedIn)
        userLoggedIn && dbService.fetchActivePosts()
                        .then((posts)=>{
                            setPosts(posts)
                        })
    },[])

    return(
        userLoggedIn ? (
            <div>
                HomePage
            </div>
        ) : (
            <div>
                <Link to='/login'>Login</Link> to access blogs.
            </div>
        )
        
    )
}

export default HomePage;