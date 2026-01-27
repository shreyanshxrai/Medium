import { Button } from "./Button"
import { Avatar } from "./Avatar"
import { useNavigate } from "react-router-dom"

interface BlogCardProps {
    authorName : string,
    title : string,
    content : string,
    publishedDate: string,
    id : number


}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}:BlogCardProps)=>{
    const navigate = useNavigate();
    return <div className="w-full shadow-md hover:shadow-lg">
        <div className="flex flex-col ">
        <div className="flex flex-col">
            <div className="flex justify-start">
            <div className="flex justify-center m-1"><Avatar name={authorName}/></div>
            <div className="flex justify-center m-1 p-1 font-light">{authorName}</div>
            <div className="flex justify-center mt-4 p-1">
            <div className="relative inline-flex items-center justify-center w-1 h-1 overflow-hidden bg-gray-400 rounded-full  " ></div></div>
            <div className="flex justify-center m-1 font-extralight p-1 text-slate-500">{publishedDate}</div>
            </div>
            <div className="m-1">
            <div className="font-bold text-2xl mb-2">{title}</div>
            <div className="">{content.slice(0,100)+"..."}</div>
            <div className="size-32 "><Button lable="Read more" onClick={()=>navigate(`/read/${id}`)}/></div></div>
            </div>
        </div>
    </div>
}


