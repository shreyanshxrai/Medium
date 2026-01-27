import { useState , useEffect } from "react"
import { NavBlogs } from "../components/NavBlogs"
import { blogpostInput } from "@shreyanshxrai/medium-common"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const CreateBlog = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [blogpost, setBlogpost] = useState<blogpostInput>({
    title: "",
    content: "",
  })

  useEffect(() => {
    if (!token) {
      navigate("/signup")
    }
  }, [token, navigate])

  const user = token
    ? jwtDecode<{ name: string; id: number }>(token)
    : null

  const handleSubmit = async () => {
    if (!blogpost.title.trim() || !blogpost.content.trim()) return

    await axios.post(`${BACKEND_URL}/api/v1/blog/post`, blogpost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    navigate("/blog")
  }

  if (!token) return null

  return (
    <div className="flex flex-col">
      <NavBlogs
        lable="Publish"
        name={user?.name || ""}
        onClick={handleSubmit}
        disabled={!blogpost.title.trim() || !blogpost.content.trim()}
      />

      <div className="mt-16 p-3.5">
        <input
          type="text"
          placeholder="Title"
          className="w-full font-extrabold p-1 text-3xl focus:outline-none"
          value={blogpost.title}
          onChange={(e) =>
            setBlogpost((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </div>

      <textarea
        className="text-sm focus:outline-none block w-screen h-screen resize-none p-3.5"
        placeholder="Tell your story..."
        value={blogpost.content}
        onChange={(e) =>
          setBlogpost((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }
      />
    </div>
  )
}
