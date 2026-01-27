import { Link } from "react-router-dom";

type headerprops= {lable : string, linktext :string , heading : string , to : string} ;
export function Header ({heading , lable , linktext ,to}:headerprops){
    return <div className="flex justify-center flex-col">
    <div className='flex justify-center'>
    <div className='text-4xl text-black font-extrabold m-2'>{heading}</div></div>
    <div className=" flex justify-center">
    <div className=' text-m text-gray-500 mt-2'>{lable}</div>
    <Link to= {to} className=' text-m text-gray-500 mt-2 underline'>{linktext}</Link>
    
    
   </div>
   </div>
}
  