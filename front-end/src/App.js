import FormCard from './components/cards/form-card';
import AdminAccess from './views/AdminAccess.js';
import AdminArchive from './views/AdminArchive.js';
import AdminLogin from './views/AdminLogin.js';
import AdminReg from './views/AdminReg.js';
import AdminRlist from './views/AdminRList';
import AdminSList from './views/AdminSList.js';
import AdminUpload from './views/AdminUpload.js';
import FacultyReg from './views/FacultyReg.js';
import FacultySList from './views/FacultySList.js';
import FacultyUpload from './views/FacultyUpload.js';
import Login from './views/Login.js';
import MobileRList from './views/MobileRList.js';
import MobileRListFilter from './views/MobileRList.js';
import MobileStudentChangePass from './views/MobileStudentChangePass.js';
import MobileStudentCopyright from './views/MobileStudentCopyright.js';
import MobileStudentFavorites from './views/MobileStudentFavorites.js';
import RListFilter from './views/RListFilter.js';
import SListFilter from './views/SListFilter.js';
import StudentChangePass from './views/StudentChangePass.js';
import StudentFavorites from './views/StudentFavorites.js';
import StudentCopyRight from './views/StudentCopyRight.js';
import StudentRList from './views/StudentRList.js';


import Frame from './views/Frame';
import SFrame from './views/SFrame';
import EmptyFrame from './views/EmptyFrame';





import {Route, Switch} from 'react-router-dom';

import './styles/app.css';

const ROOT = '/'
const views = [
  ROOT,
  '/sign-in',
  '/admin-access',
  '/admin-archive',
  '/admin-log-in',
  '/admin-reg',
  '/admin-rlist',
  '/admin-slist',
  '/admin-upload',
  '/faculty-reg',
  '/faculty-slist',
  '/faculty-upload',
  '/m-rlist',
  '/m-rlistfilter',
  '/m-changepass',
  '/m-copyright',
  '/m-favorites',
  '/rlist-filter',
  '/slist-filter',
  '/student-changepass',
  '/student-copyright',
  '/student-favorites',
  '/student-rlist',

]

const PageNotFound = () => {
  return(
      <div>
          <h1>404: Page not found!</h1>
          <p>The page you are trying to load is not found.</p>
      </div>
    );
}





function App() {
  const pathname = window.location.pathname;


  if( views.indexOf(pathname) < 0 ){
    return <PageNotFound />
  }


  return (
   <div className="app">
     <Switch>
        <Route path="/admin-access">
          <Frame>
            <AdminAccess />
          </Frame>
        </Route>

        <Route path="/admin-archive">
          <Frame>
            <AdminArchive />
          </Frame>
        </Route>

        <Route path="/admin-log-in">
          <Frame>
            <AdminLogin />
          </Frame>
        </Route>

        <Route path="/admin-reg">
          <Frame>
            <AdminReg />
          </Frame>
        </Route>

        <Route exact path="/admin-rlist">
          <Frame>
            <AdminRlist />
          </Frame>
        </Route>

        <Route exact path="/admin-slist">
          <Frame>
            <AdminSList />
          </Frame>
        </Route>

        <Route path="/admin-upload">
          <Frame>
            <AdminUpload />
          </Frame>
        </Route>

        <Route path="/faculty-reg">
          <Frame>
            <FacultyReg />
          </Frame>
        </Route>

        <Route path="/faculty-slist">
          <Frame>
            <FacultySList />
          </Frame>
        </Route>

        <Route path="/faculty-upload">
          <Frame>
            <FacultyUpload />
          </Frame>
        </Route>

        <Route path="/sign-in">
          <Login />
        </Route>

        <Route path="/m-rlist">         
          <MobileRList />
        </Route>

        <Route path="/m-rlistfilter">
          <MobileRListFilter />
        </Route>

        <Route path="/m-changepass">
          <MobileStudentChangePass />
        </Route>

        <Route path="/m-copyright">
          <MobileStudentCopyright />
        </Route>

        <Route path="/m-favorites">
          <MobileStudentFavorites />
        </Route>

        <Route path="/rlist-filter">
          <EmptyFrame>
            <RListFilter />
          </EmptyFrame>
        </Route>

        <Route path="/slist-filter">
          <EmptyFrame>
            <SListFilter />
          </EmptyFrame>
        </Route>

        <Route path="/student-changepass">
          <SFrame>          
            <StudentChangePass />
          </SFrame>
        </Route>

        <Route path="/student-favorites">
          <SFrame>
            <StudentFavorites />
          </SFrame>
        </Route>

        <Route path="/student-copyright">
          <SFrame>
            <StudentCopyRight />
          </SFrame>
        </Route>

        <Route path="/student-rlist">
          <SFrame>
            <StudentRList />
          </SFrame>
        </Route>

     </Switch>
   </div>
  );
}

export default App;
