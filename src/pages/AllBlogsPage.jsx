import { useEffect, useState } from "react";
import dbService from "../appwrite-services/DatabaseService";

function AllBlogsPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        dbService.fetchActivePosts()
            .then((activeBlogs) => {
                if(activeBlogs){
                    setBlogs(activeBlogs);
                }
            })
    },[])

    return(
        <div>
            {blogs.length > 0?(
                <div>Showing all posts</div>
            ):(
                <div>Loading...</div>
            )}
        </div>
    )
}

export default AllBlogsPage;