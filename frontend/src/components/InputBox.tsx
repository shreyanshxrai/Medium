type inputboxprop = {
    lable : string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputBox({lable , ...props}:inputboxprop){
return <div>

    <div className='text-sm text-black py-2 font-medium m-4'>{lable}</div>
    <input {...props}className=' w-full border border-slate-700 px-2 py-1 shadow-md rounded-base rounded-sm'/>
   </div>
   
   }