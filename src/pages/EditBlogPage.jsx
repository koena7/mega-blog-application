import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite-services/DatabaseService";
import { Blog } from "../components";

function EditBlogPage() {

    const [blog, setBlog] = useState(null);
    const id = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            dbService.fetchPost(id)
                .then((fetchedBlog) => {
                    if(fetchedBlog){
                        setBlog(fetchedBlog);
                    }
                })
        }else{
            navigate(`/allBlogs`)
        }
    },[id, blog])

    return(
        <div>
            {post && (
                <Blog post={blog}/>
            )}
        </div>
    );
}

export default EditBlogPage;