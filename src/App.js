
import './App.css';
import { Outlet, Route, Routes,Navigate } from 'react-router-dom';
import Navigator from './components/navigator/navigator';
import Home from './pages/home/home';
import Contact from './pages/contact/contact';
import About from './pages/about/about';
import Login from './pages/login/login';
import NotFound from './pages/not_found/not_found';
import Interviews from './pages/interviews/interviews';
import Offices from './pages/offices/offices';
import Loading from './pages/loading/loading';
import { useState } from 'react';
import Room from './pages/room/room';

const isAuth=false;

function Main(){
  return <>
    <Navigator></Navigator>
    <Outlet></Outlet>
  </>
}


function App() {

  const [isLoading,setLoadingState]=useState(true);

  const protectedPage=(Component)=>isAuth?<Component/>:
  <Navigate replace={true} to="/login"></Navigate>

  const authenticationControl=(Component)=>!isAuth?<Component/>:
  <Navigate replace={true} to="/interviews"></Navigate>
  
  if(!isLoading)
   return <Loading></Loading>
  
  return (
    <>
     <Routes>
        <Route element={<Main/>}>
            {/*Not protected*/}
            <Route exact path='/' element={authenticationControl(Home)}></Route>
            <Route path='contact' element={<Contact/>}></Route>
            <Route path='about' element={<About/>}></Route>
            <Route path='login' element={authenticationControl(Login)}></Route>

            {/*Protected*/}
            <Route path='interviews' element={protectedPage(Interviews)}></Route>
            <Route path='offices' element={protectedPage(Offices)}></Route>
        </Route>
           
        <Route path='/interview/:id' element={protectedPage(Room)}></Route>
        <Route path='/office/:id' element={protectedPage(Room)}></Route>

        <Route path='*' element={<NotFound></NotFound>}></Route>
     </Routes>
    </>
  );
}

export default App;
