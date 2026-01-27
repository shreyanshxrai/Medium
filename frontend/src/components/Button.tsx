
type Buttoninput={lable : string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({lable , ...props}:Buttoninput){
    return <div>
    <button {...props} className='w-full  bg-black
     text-white
     hover:bg-gray-950 
      focus:outline-none 
      focus:ring-4
      focus:ring-slate-300
      font-medium
      rounded-lg
      text-sm px-5 py-2.5
       
       my-8
       
      '>{lable}</button>
   </div>
}