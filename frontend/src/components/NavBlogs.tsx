import { useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
type Buttoninput={lable : string;
    name: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const NavBlogs = ({lable ,name,...props}:Buttoninput)=>{
    const navigate = useNavigate();
    return <div>
    <nav className="w-full p-4 shadow-md fixed bg-white">
        <div className="flex justify-between">
        <div className="flex justify-center font-bold">Medium</div>
        <div className="flex "> 
            <button {...props} className="w-full 
            test-xs
            bg-green-600
            hover:bg-green-700
            rounded-full
            focus:outline-none
            font-thin
            text-white
            px-2 py-1  
            mx-2">{lable}</button>
            <button onClick={()=>{localStorage.removeItem("token");
                navigate("/signin")
            }}className="w-full 
            test-xs
            bg-green-600
            hover:bg-green-700
            rounded-full
            focus:outline-none
            font-thin
            text-white
            px-2 py-1  
            mx-2" >Logout</button>
            <div className="mx-2"><Avatar name={name}/></div>
            
        </div>
        </div>
    </nav></div>
}
