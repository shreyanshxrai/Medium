import { BrowserRouter , Route , Routes} from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import './App.css'
import { SignIn } from './pages/SignIn';
import { Blogs } from './pages/Blogs';
import { CreateBlog } from './pages/CreateBlog';
import { Blog } from './pages/Blog';


function App() {
 const token = localStorage.getItem("token");
 

  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element = {token? <Blogs/>:<SignUp/>}/>
   <Route path='/signup' element = { <SignUp/>} />
   <Route path='/signin' element={<SignIn/>}/>
   <Route path='/blog' element={<Blogs/>}/>
   <Route path='/create' element={<CreateBlog/>}/>
   <Route path='/read/:id' element={<Blog/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
