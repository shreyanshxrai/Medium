export const Avatar = ({name}:{name:string})=>{
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full " >
    <span className="font-medium text-body">{name[0]}</span>
</div>
}