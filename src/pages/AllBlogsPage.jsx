import { useEffect, useState } from "react";
import dbService from "../appwrite-services/DatabaseService";

function AllBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        dbService.fetchActivePosts()
            .then((activeBlogs) => {
                if(activeBlogs>=0){
                    setBlogs(activeBlogs);
                }
            })
    },[])

    return(
        <div>
            {blogs.length > 0?(
                <div>Showing all posts</div>
            ):(
                <div>No blogs fetched!</div>
            )}
        </div>
    )
}

export default AllBlogsPage;