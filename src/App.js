
import './App.css';
import { Outlet, Route, Routes,Navigate } from 'react-router-dom';
import Navigator from './components/navigator/navigator';
import Loading from './components/loading/loading';
import { useCallback, useState,useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authControl} from './axios/http'
import { setLogin } from './redux_store/actions/auth_actions/actions';

const Offices=React.lazy(()=>import('./pages/offices/offices'))
const Home=React.lazy(()=>import('./pages/home/home'))
const Contact=React.lazy(()=>import( './pages/contact/contact'))
const About=React.lazy(()=>import( './pages/about/about'))
const Login=React.lazy(()=>import('./pages/login/login'))
const NotFound=React.lazy(()=>import( './pages/not_found/not_found'))
const Interviews=React.lazy(()=>import( './pages/interviews/interviews'))
const Room=React.lazy(()=>import('./pages/room/room'))

const suspense=(component,fallback)=>{
  return <Suspense fallback={fallback}>
    {
      component
    }
  </Suspense>
}

function Main(){
  return <>
    <Navigator></Navigator>
    <Outlet></Outlet>
  </>
}


function App() {
   
  const [isLoading,setLoadingState]=useState(true);
  const isAuth=useSelector(state=>state.authReducer.isAuth)
  const dispatch=useDispatch();

  const protectedPage=(Component)=>isAuth?suspense(<Component></Component>,<></>):
  <Navigate replace={true} to="/login"></Navigate>

  const authenticationControl=(Component)=>!isAuth?suspense(<Component></Component>,<></>):
  <Navigate replace={true} to="/interviews"></Navigate>
 
  const handleAuthControl=useCallback(async ()=>{
    try{
      const {data} = await authControl();
      dispatch(setLogin(data));
      setLoadingState(false);
    }catch(err){
      console.log(err)
      setLoadingState(false);
    }
  },[])

  useEffect(()=>{
    handleAuthControl();
  },[])
  
  if(isLoading)
   return <Loading></Loading>
  return (
    <>
     <Routes>
        <Route element={<Main/>}>
            {/*Not protected*/}
            <Route exact path='/' element={authenticationControl(Home)}></Route>
            <Route path='contact' element={suspense(<Contact/>,<></>)}></Route>
            <Route path='about' element={suspense(<About/>,<></>)}></Route>
            <Route path='login' element={authenticationControl(Login)}></Route>

            {/*Protected*/}
            <Route path='interviews' element={protectedPage(Interviews)}></Route>
            <Route path='offices' element={protectedPage(Offices)}></Route>
        </Route>
           
        <Route path='/interview/:id' element={protectedPage(Room)}
          ></Route>
        
        <Route path='*' element={suspense(<NotFound></NotFound>,<></>)}></Route>
     </Routes>
    </>
  );
}

export default App;
