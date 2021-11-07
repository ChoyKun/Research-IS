import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import FormCard from './components/cards/form-card';
import AdminAccess from './views/AdminAccess.js';
import AdminChangepass from './views/AdminChangepass.js';
import AdminArchive from './views/AdminArchive.js';
import AdminLogin from './views/AdminLogin.js';
import AdminReg from './views/AdminReg.js';
import AdminRequest from './views/AdminRequest.js';
import AdminProfile from './views/AdminProfile.js';
import AdminEditProfile from './views/AdminEditProfile.js';
import AdminRlist from './views/AdminRList';
import AdminSList from './views/AdminSList.js';
import AdminSApproved from './views/AdminSApproved.js';
import AdminInactiveSList from './views/AdminInactiveSList.js';
import AdminFList from './views/AdminFList.js';
import AdminUpload from './views/AdminUpload.js';
import AdminCO from './views/AdminCO.js';
import AdminCList from './views/AdminCList.js';
import AdminNewCoor from './views/AdminNewCoor.js';
import FacultyReg from './views/FacultyReg.js';
import FacultyProfile from './views/FacultyProfile.js';
import FacultyEditProfile from './views/FacultyEditProfile.js';
import FacultyEditStudent from './views/FacultyEditStudent.js';
import FacultyChangepass from './views/FacultyChangepass.js';
import FacultySList from './views/FacultySList.js';
import FacultyInactiveSList from './views/FacultyInactiveSList.js';
import Login from './views/Login.js';
import EmergencyAdmin from './views/EmergencyAdmin.js';
import MobileRList from './views/MobileRList.js';
import MobileRListFilter from './views/MobileRListFilter.js';
import MobileStudentChangePass from './views/MobileStudentChangePass.js';
import RListFilter from './views/RListFilter.js';
import SListFilter from './views/SListFilter.js';
import StudentChangePass from './views/StudentChangePass.js';
import StudentRList from './views/StudentRList.js';
import StudentProfile from './views/StudentProfile.js';
import StudentPending from './views/StudentPending.js';
import StudentApproved from './views/StudentApproved.js';
import AbstractView from './views/AbstractView.js';
import FullContent from './views/FullContent.js';



import AdminFrame from './views/AdminFrame';
import FacultyFrame from './views/FacultyFrame';
import SFrame from './views/SFrame';
import EmptyFrame from './views/EmptyFrame';
import MFrame from './views/MFrame'

import EventEmitter from './modules/custom-event-emitter';

import {Route, Switch} from 'react-router-dom';

import FilterContext from './contexts/filter-context';
import './styles/app.css';

const ROOT = '/'
const views = [
  ROOT,
  '/sign-in',
  '/admin-access',
  '/admin-archive',
  '/admin-changepass',
  '/admin-log-in',
  '/admin-request',
  '/admin-profile',
  '/admin-edit-profile',
  '/admin-reg',
  '/emergency-admin',
  '/admin-current-officer',
  '/admin-rlist',
  '/admin-slist',
  '/admin-sapproved',
  '/admin-inactive-slist',
  '/admin-flist',
  '/admin-upload',
  '/admin-new-coor',
  '/admin-coor-list',
  '/MIS-reg',
  '/MIS-profile',
  '/MIS-edit-profile',
  '/MIS-edit-student',
  '/MIS-changepass',
  '/MIS-slist',
  '/MIS-inactive-slist',
  '/m-rlist',
  '/m-rlistfilter',
  '/m-changepass',
  '/m-copyright',
  '/rlist-filter',
  '/slist-filter',
  '/student-changepass',
  '/student-copyright',
  '/student-rlist',
  '/student-approved',
  '/student-pending',
  '/student-profile',
  '/research-abstract',
  '/research-full'
];


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
  const [requests, setRequests] = React.useState( null );
  const [secRequests, setSecRequests] = React.useState([]);
  const [requestedView, setRequetedView] = React.useState( null );

  const [sFilter, setSFilter] = React.useState( null );
  
  
  React.useEffect(() => {
    const token = Cookies.get('token');
    const rtoken = Cookies.get('rtoken');

    // axios.defaults.headers.common['Authorization'] = token; // d ba pwede iset sa global na lang? pano ba iset as global?
    // Bali eto na yung global eh kaso ayaw gumana nasa loob siya ng function d ba? d ba kapag global sa labas nung function? tapos import na lang?
    // Same shit ata eh pero ang pwede mong gawin eh ganto

    const authenticate = () => {
      if( token ){
        // allow access
        axios.get('http://localhost:7000/verify-me', {
          headers: {
            'authentication': `Bearer ${token}`
          }
        })
        .then(() => { 
          setRequetedView( <Redirect to={ pathname }/> );
        })
        .catch( err => {
          if( rtoken && err?.response?.status && (err?.response?.status === 403 || err?.response?.status === 401) ){
            axios.post('http://localhost:7000/refresh-token', { rtoken })
            .then( res => {
              Cookies.set('token', res.data.accessToken);
              authenticate();
            })
            .catch( err => {
              setRequetedView( <Redirect to="/sign-in"/> );
            });
          }
      
          // setRequetedView( <Redirect to="/sign-in"/>);
        });
      }
      else{
        // sign in 
        setRequetedView(() => <Redirect to="/sign-in"/>);
      }
    }

    authenticate();
  }, []);


  return (
   <div className="app">
    <FilterContext.Provider value={{setSFilter: setSFilter, sFilter: sFilter}}>
      <Switch>
        <Route path="/admin-profile/:username">
          <AdminFrame>
            <AdminProfile />
          </AdminFrame>
        </Route>

        <Route path="/admin-access/:username">
          <FacultyFrame>
            <AdminAccess />
          </FacultyFrame>
        </Route>

        <Route path="/admin-archive/:username">
          <AdminFrame>
            <AdminArchive />
          </AdminFrame>
        </Route>

        <Route path="/admin-edit-profile/:username">
          <AdminFrame>
            <AdminEditProfile />
          </AdminFrame>
        </Route>

        <Route path="/admin-changepass/:username">
          <AdminFrame>
            <AdminChangepass />
          </AdminFrame>
        </Route>

        <Route path="/admin-log-in/:username">
          <FacultyFrame>
            <AdminLogin />
          </FacultyFrame>
        </Route>

        <Route path="/admin-reg/:username">
          <AdminFrame>
            <AdminReg />
          </AdminFrame>
        </Route>

        <Route path="/admin-request/:username">
          <AdminFrame>

            <AdminRequest />

          </AdminFrame>
        </Route>

        <Route path="/admin-new-coor">
          <AdminFrame>
            <AdminNewCoor />
          </AdminFrame>
        </Route>

        <Route path="/admin-coor-list/:username">
          <AdminFrame>
            <AdminCList />
          </AdminFrame>
        </Route>

        <Route path="/admin-current-officer/:username">
          <AdminFrame>
            <AdminCO />
          </AdminFrame>
        </Route>

        <Route exact path="/admin-rlist/:username">
          <AdminFrame>
            <AdminRlist />
          </AdminFrame>
        </Route>

        <Route exact path="/admin-slist/:username">
          <AdminFrame>
            <AdminSList />
          </AdminFrame>
        </Route>

        <Route exact path="/admin-sapproved/:username/:studentNo">
          <AdminFrame>
            <AdminSApproved />
          </AdminFrame>
        </Route>

        <Route exact path="/admin-inactive-slist/:username">
          <AdminFrame>
            <AdminInactiveSList />
          </AdminFrame>
        </Route>

        <Route exact path="/admin-flist/:username">
          <AdminFrame>
            <AdminFList />
          </AdminFrame>
        </Route>

        <Route path="/admin-upload/:username">
          <AdminFrame>
            <AdminUpload />
          </AdminFrame>
        </Route>

        <Route path="/MIS-reg/:username">
          <FacultyFrame>
            <FacultyReg />
          </FacultyFrame>
        </Route>

        <Route path="/emergency-admin">
          <FacultyFrame>
            <EmergencyAdmin />
          </FacultyFrame>
        </Route>

        <Route path="/MIS-profile/:username">
          <FacultyFrame>
            <FacultyProfile />
          </FacultyFrame>
        </Route>

        <Route path="/MIS-edit-profile/:username">
          <FacultyFrame>
            <FacultyEditProfile />
          </FacultyFrame>
        </Route>

        <Route path="/MIS-edit-student/:username/:studentNo">
          <FacultyFrame>
            <FacultyEditStudent />
          </FacultyFrame>
        </Route>

        <Route path="/MIS-changepass/:username">
          <FacultyFrame>
            <FacultyChangepass />
          </FacultyFrame>
        </Route>

        <Route path="/MIS-slist/:username">
          <FacultyFrame>
            <FacultySList />
          </FacultyFrame>
        </Route>

         <Route path="/MIS-inactive-slist/:username">
          <FacultyFrame>
            <FacultyInactiveSList />
          </FacultyFrame>
        </Route>

        <Route path="/sign-in">
          <Login />
        </Route>

        <Route path="/m-rlist">
          <MFrame>
            <MobileRList />
          </MFrame>
        </Route>

        <Route path="/m-rlistfilter">
          <MFrame>
            <MobileRListFilter />
          </MFrame>
        </Route>

        <Route path="/m-changepass">
          <MFrame>
            <MobileStudentChangePass />
          </MFrame>
        </Route>

        <Route path="/rlist-filter">
          <EmptyFrame>
            <RListFilter setSFilter={setSFilter}/>
          </EmptyFrame>
        </Route>

        <Route path="/slist-filter">
          <EmptyFrame>
            <SListFilter />
          </EmptyFrame>
        </Route>

        <Route path="/student-changepass/:username">
          <SFrame>          
            <StudentChangePass />
          </SFrame>
        </Route>

        <Route path="/student-rlist/:username">
          
          <SFrame >
            <StudentRList />
          </SFrame>
        </Route>

        <Route path="/student-approved/:username">
          <SFrame>
            <StudentApproved />
          </SFrame>
        </Route>

        <Route path="/student-pending/:username">
          <SFrame>
            <StudentPending />
          </SFrame>
        </Route>

        <Route path="/student-profile/:username">
          <SFrame>
            <StudentProfile />
          </SFrame>
        </Route>

        <Route path="/research-abstract/:id">
            <AbstractView />        
        </Route>

        <Route path="/research-full/:id">
            <FullContent />        
        </Route>        
      </Switch>
    </FilterContext.Provider>

    { pathname === views[ 0 ] ? <Redirect to="/sign-in"/> : requestedView }  
   </div>
  );
  
}


export default App;
