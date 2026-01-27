import { Qoute } from "../components/Qoute"
import { InputBox } from "../components/InputBox"
import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { useState  } from "react"
import { useNavigate} from "react-router-dom"
import { signupInput } from "@shreyanshxrai/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const SignUp = ()=>{
const navigate = useNavigate();
const [postInput , setPostInputs] = useState<signupInput>({
    name: "",
    username : "",
    password :""
})
async function sendRequest() { 
    try{
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup` , postInput);
    const token = response.data.token;
    const msg = response.data.msg;
    localStorage.setItem("token",token);
    alert(msg)
    navigate("/blog")
    
    }
    catch(e){
        console.log(e)
        alert("Error while signup");
    }
    
}
     return <div className=" grid grid-cols-2 w-full">
        <div className=" m-8 place-content-center" >
            <Header lable={"Already have an account?"} heading="Create Account" linktext="Signin" to="/signin"/>
            <InputBox lable={"Username"} placeholder="shreyanshtalks@gmail.com" type="email" onChange={(e)=>{
                setPostInputs({
                    ...postInput,
                    username: e.target.value
                })
            }} />
            <InputBox lable="Name" placeholder="Shreyansh Rai" type="text" onChange={(e)=>{
                    setPostInputs({
                        ...postInput,
                        name :e.target.value
                    })
            }}/>
            <InputBox lable = "Password " placeholder="XXXXXXX" type="password" onChange={(e)=>{
                setPostInputs({
                    ...postInput,
                    password  : e.target.value
                })
            }}/>
            <Button lable="SignUp" onClick={sendRequest}/>
        </div>
        <div className="flex justify-center"><Qoute/></div>
    </div>
}
