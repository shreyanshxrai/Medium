import { NavBlogs } from "../components/NavBlogs"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useParams } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState , useEffect } from "react"

interface BlogType {
  id: number
  title: string
  content: string
  date: string
  author: {
    name: string
  }
}

export const Blog = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const token = localStorage.getItem("token")

  const [blog, setBlog] = useState<BlogType | null>(null)
  const [loading, setLoading] = useState(true)

  const user = token
    ? jwtDecode<{ name: string; id: number }>(token)
    : null

  useEffect(() => {
    if (!token || !id) return

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlog(res.data)
      })
      .finally(() => setLoading(false))
  }, [id, token])

  if (!token) {
    navigate("/signin")
    return null
  }

  if (loading) {
    return <div className="flex flex-col">
      <NavBlogs
        lable="Home"
        name={user?.name || ""}
        onClick={() => navigate("/blog")}
      />
<div role="status" className="max-w-sm animate-pulse">
      <div className="mt-16 p-3.5">
        <div className="font-extrabold text-4xl"><div className="h-2.5 w-full bg-gray-300 rounded-full  mb-4"></div></div>

        <div className="text-sm text-gray-600">
          <div className="h-2.5 w-full bg-gray-300 rounded-full  mb-4"></div>
        </div>

        <div className="mt-4"><div className="h-2 w-full bg-gray-300 rounded-full  mb-2.5"></div>
        <div className="h-2 w-full bg-gray-300 rounded-full  mb-2.5"></div>
        <div className="h-2 w-full bg-gray-300 rounded-full  mb-2.5"></div>
        <div className="h-2 w-full bg-gray-300 rounded-full  mb-2.5"></div>
        <div className="h-2 w-full bg-gray-300 rounded-full  mb-2.5"></div></div>
      </div>
    </div></div>
  }

  if (!blog) {
    return <div className="p-4">Blog not found</div>
  }

  return (
    <div className="flex flex-col">
      <NavBlogs
        lable="Home"
        name={user?.name || ""}
        onClick={() => navigate("/blog")}
      />

      <div className="mt-16 p-3.5">
        <div className="font-extrabold text-4xl">{blog.title}</div>

        <div className="text-sm text-gray-600">
          Published on {blog.date} by{" "}
          {blog.author.name}
        </div>

        <div className="mt-4">{blog.content}</div>
      </div>
    </div>
  )
}