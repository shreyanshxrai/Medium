import { BlogCard } from "../components/BlogCard"
import { NavBlogs } from "../components/NavBlogs"
import { useState , useEffect } from "react"
import axios  from "axios"
import { BACKEND_URL } from "../config"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"


interface Blog {
    "id" : number,
    "title" : string,
    "content" : string,
    "date" : string,
    "author" : {
        "name" :string
    }
}
export const Blogs = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
  }, [token, navigate])

  
  const user = token
    ? jwtDecode<{ name: string; id: number }>(token)
    : null

  
  useEffect(() => {
    if (!token) return

    axios
      .get(`${BACKEND_URL}/api/v1/blog/blogbulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogs(response.data)
      })
      .finally(() => setLoading(false))
  }, [token])
   if (loading){
    return <div className="flex flex-col">
        <div className="flex">
            <NavBlogs lable="Create" name={user?.name||""} onClick={()=>navigate("/create")}/>

        </div>
        <div className="flex flex-col">
        <div className="mt-16  p-3.5 mb-4"></div>
    <div role="status" className="max-w-sm animate-pulse">
<div className="w-full shadow-md hover:shadow-lg">
        <div className="flex flex-col ">
        <div className="flex flex-col">
            <div className="flex justify-start">
            <div className="flex justify-center m-1"><div className="h-2.5 w-full bg-gray-300 rounded-full  mb-4"></div></div>
            <div className="flex justify-center m-1 p-1 font-light"><div className="h-2 w-full  bg-gray-300 rounded-full mb-2.5"></div></div>
            <div className="flex justify-center mt-4 p-1">
            <div className="relative inline-flex items-center justify-center w-full h-1 overflow-hidden bg-gray-400 rounded-full  " ></div></div>
            <div className="flex justify-center m-1 font-extralight p-1 text-slate-500"><div className="h-2 w-full bg-gray-300 rounded-full mb-2.5"></div></div>
            </div>
            <div className="m-1">
            <div className="font-bold text-2xl mb-2"><div className="h-2 w-full bg-gray-300 rounded-full  mb-2.5"></div></div>
            <div className=""><div className="h-2 w-full bg-gray-300 rounded-full  mb-2.5"></div></div>
            <div className="size-32 "><span className="sr-only">Loading...</span></div></div>
            </div>
        </div>
    </div>
    </div> </div>
        </div>
   }
   else{
   
   
    return <div className="flex flex-col">
        <div className="flex">
            <NavBlogs lable="Create" name={user?.name||""} onClick={()=>navigate("/create")}/>

        </div>
        <div className="flex flex-col">
        <div className="mt-16  p-3.5 mb-4">
            {blogs.map((posts) => <BlogCard key={posts.id} title={posts.title} content= {posts.content} publishedDate={posts.date} authorName={posts.author.name} id={posts.id}/>)
}
        </div>
        </div></div>
}

}


