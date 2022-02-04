import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

import FormCard from './components/cards/form-card';
import AdminAccess from './views/AdminAccess.js';
import AdminChangepass from './views/AdminChangepass.js';
import AdminArchive from './views/AdminArchive.js';
import AdminActLogs from './views/AdminActLogs.js';
import AdminLogin from './views/AdminLogin.js';
import AdminReg from './views/AdminReg.js';
import AdminUnauthorized from './views/AdminUnauthorized.js';
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
import AdminDashboard from './views/AdminDashboard.js';
import AdminNewCoor from './views/AdminNewCoor.js';
import FacultyReg from './views/FacultyReg.js';
import FacultyProfile from './views/FacultyProfile.js';
import FacultyEditProfile from './views/FacultyEditProfile.js';
import FacultyEditStudent from './views/FacultyEditStudent.js';
import FacultyChangepass from './views/FacultyChangepass.js';
import FacultySList from './views/FacultySList.js';
import FacultyDashboard from './views/FacultyDashboard.js';
import FacultyInactiveSList from './views/FacultyInactiveSList.js';
import Login from './views/Login.js';
import EmergencyAdmin from './views/EmergencyAdmin.js';
import MobileRList from './views/MobileRList.js';
import MobileDashboard from './views/MobileDashboard.js';
import MobileLogin from './views/MobileLogin.js';
import MobileAbstract from './views/MobileAbstract.js';
import MobileFull from './views/MobileFull.js';
import MobilePending from './views/MobilePending.js';
import MobileApproved from './views/MobileApproved.js';
import MobileProfile from './views/MobileProfile.js';
import MobileRListFilter from './views/MobileRListFilter.js';
import MobileStudentChangePass from './views/MobileStudentChangePass.js';
import RListFilter from './views/RListFilter.js';
import SListFilter from './views/SListFilter.js';
import StudentChangePass from './views/StudentChangePass.js';
import StudentDashboard from './views/StudentDashboard.js';
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
import InboxContext from './contexts/Inbox-context';
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
  '/admin-act-logs',
  '/admin-reg',
  '/admin-dashboard',
  '/emergency-admin',
  '/admin-current-officer',
  '/admin-rlist',
  '/admin-unauthorized',
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
  '/MIS-dashboard',
  '/m-rlist',
  '/m-login',
  '/m-abstract',
  '/m-full-content',
  '/m-profile',
  '/m-pending',
  '/m-approved',
  '/m-dashboard',
  '/m-rlistfilter',
  '/m-changepass',
  '/m-copyright',
  '/rlist-filter',
  '/slist-filter',
  '/student-changepass',
  '/student-copyright',
  '/student-rlist',
  '/student-dashboard',
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
  const [inboxMessages, setInboxMessages] = React.useState( [] );
  const [sFilter, setSFilter] = React.useState( null );

  const authenticate = () => {
    const token = Cookies.get('token');
    const rtoken = Cookies.get('rtoken');

    if( token ){
      axios.get('http://localhost:7000/verify-me', {
        headers: {
          'authentication': `Bearer ${token}`
        }
      })
      .then(req => {
        const { role, name } = req.data.user;

        console.log( role, name );
        switch( role ){
          case 'student':
            setRequetedView( <Redirect to={`/student-dashboard/${name}`}/> );
            break;

          case 'mis officer':
            setRequetedView( <Redirect to={`/MIS-dashboard/${name}`}/> );
            break;
            
          case 'admin':
            axios.get(`http://localhost:7000/verify/admin/${name}`)
            .then(res=>{
              console.log('here1')
              setRequetedView( <Redirect to={pathname}/> );
            })
            .catch(err=>{
              console.log('here2')
              setRequetedView( <Redirect to={`/admin-dashboard/${name}`}/> );
            })
            break;
        }

        // setRequetedView( <Redirect to={ pathname }/> );
      })
      .catch( err => {
        if( rtoken && err?.response?.status && err?.response?.status === 401 ){
          axios.post('http://localhost:7000/refresh-token', { rtoken })
          .then( res => {
            Cookies.set('token', res.data.accessToken);
            authenticate();
          })
          .catch( err => {
            setRequetedView( <Redirect to="/sign-in"/> );
          });
        }
        else{
          console.log('here')
          setRequetedView( <Redirect to="/sign-in"/> );
        }
    
        // setRequetedView( <Redirect to="/sign-in"/>);
      });
    }
    else{
      // sign in 
      setRequetedView(() => <Redirect to="/sign-in"/>);
    }
  }

  const getMessages = async () => {
    console.log('here');
    axios.get('http://localhost:7000/messages')
    .then( res => {
      console.log( res.data.data );
      setInboxMessages( res.data.data );
    })
    .catch( err => {
      throw err;
    });
  }

  React.useEffect(() => {
    authenticate();
    getMessages();
  }, []);

  const isMobile = () => /iPhone|iPad|iPod|Android/i.test( navigator.userAgent );

  return (
    <InboxContext.Provider value={inboxMessages}>
      <SnackbarProvider maxSnack={3}>
         <div className="app">
          <FilterContext.Provider value={{setSFilter: setSFilter, sFilter: sFilter}}>
            <Switch>
              <Route path="/admin-profile/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminProfile />
                </AdminFrame>
              </Route>

               <Route path="/admin-act-logs/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminActLogs />
                </AdminFrame>
              </Route>

              <Route path="/admin-access/:username">
                <FacultyFrame authenticate={authenticate}>
                  <AdminAccess />
                </FacultyFrame>
              </Route>

              <Route path="/admin-archive/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminArchive />
                </AdminFrame>
              </Route>

              <Route path="/admin-edit-profile/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminEditProfile />
                </AdminFrame>
              </Route>

              <Route path="/admin-changepass/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminChangepass />
                </AdminFrame>
              </Route>

               <Route path="/admin-dashboard/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminDashboard />
                </AdminFrame>
              </Route>

              <Route path="/admin-log-in/:username">
                <FacultyFrame authenticate={authenticate}>
                  <AdminLogin />
                </FacultyFrame>
              </Route>

              <Route path="/admin-reg/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminReg />
                </AdminFrame>
              </Route>

              <Route path="/admin-unauthorized/:username">
                <FacultyFrame authenticate={authenticate}>
                  <AdminUnauthorized />
                </FacultyFrame>
              </Route>

              <Route path="/admin-request/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminRequest getMessages={() => getMessages()}/>
                </AdminFrame>
              </Route>

              <Route path="/admin-new-coor">
                <AdminFrame authenticate={authenticate}>
                  <AdminNewCoor />
                </AdminFrame>
              </Route>

              <Route path="/admin-coor-list/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminCList />
                </AdminFrame>
              </Route>

              <Route path="/admin-current-officer/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminCO />
                </AdminFrame>
              </Route>

              <Route exact path="/admin-rlist/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminRlist />
                </AdminFrame>
              </Route>

              <Route exact path="/admin-slist/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminSList />
                </AdminFrame>
              </Route>

              <Route exact path="/admin-sapproved/:username/:studentNo">
                <AdminFrame authenticate={authenticate}>
                  <AdminSApproved />
                </AdminFrame>
              </Route>

              <Route exact path="/admin-inactive-slist/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminInactiveSList />
                </AdminFrame>
              </Route>

              <Route exact path="/admin-flist/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminFList />
                </AdminFrame>
              </Route>

              <Route path="/admin-upload/:username">
                <AdminFrame authenticate={authenticate}>
                  <AdminUpload />
                </AdminFrame>
              </Route>

              <Route path="/MIS-reg/:username">
                <FacultyFrame authenticate={authenticate}>
                  <FacultyReg />
                </FacultyFrame>
              </Route>

              <Route path="/emergency-admin">
                <FacultyFrame authenticate={authenticate}>
                  <EmergencyAdmin />
                </FacultyFrame>
              </Route>

              <Route path="/MIS-profile/:username">
                <FacultyFrame authenticate={authenticate}>
                  <FacultyProfile />
                </FacultyFrame>
              </Route>

              <Route path="/MIS-edit-profile/:username">
                <FacultyFrame authenticate={authenticate}>
                  <FacultyEditProfile />
                </FacultyFrame>
              </Route>

              <Route path="/MIS-edit-student/:username/:studentNo">
                <FacultyFrame authenticate={authenticate}>
                  <FacultyEditStudent />
                </FacultyFrame>
              </Route>

              <Route path="/MIS-changepass/:username">
                <FacultyFrame authenticate={authenticate}>
                  <FacultyChangepass />
                </FacultyFrame>
              </Route>

              <Route path="/MIS-slist/:username">
                <FacultyFrame authenticate={authenticate}>
                  <FacultySList />
                </FacultyFrame>
              </Route>

              <Route path="/MIS-dashboard/:username">
                <FacultyFrame authenticate={authenticate}>
                  <FacultyDashboard />
                </FacultyFrame>
              </Route>

               <Route path="/MIS-inactive-slist/:username">
                <FacultyFrame authenticate={authenticate}>
                  <FacultyInactiveSList />
                </FacultyFrame>
              </Route>

              <Route path="/sign-in">
                <Login />
              </Route>

              <Route path="/m-login">
                <MobileLogin />
              </Route>

              <Route path="/m-rlist/:username">
                <MFrame authenticate={authenticate}>
                  <MobileRList />
                </MFrame>
              </Route>

              <Route path="/m-dashboard/:username">
                <MFrame authenticate={authenticate}>
                  <MobileDashboard />
                </MFrame>
              </Route>

              <Route path="/m-profile/:username">
                <MFrame authenticate={authenticate}>
                  <MobileProfile />
                </MFrame>
              </Route>

              <Route path="/m-pending/:username">
                <MFrame authenticate={authenticate}>
                  <MobilePending />
                </MFrame>
              </Route>

              <Route path="/m-approved/:username">
                <MFrame authenticate={authenticate}>
                  <MobileApproved />
                </MFrame>
              </Route>

              <Route path="/m-rlistfilter">
                <MFrame authenticate={authenticate}>
                  <MobileRListFilter />
                </MFrame>
              </Route>

              <Route path="/m-changepass">
                <MFrame authenticate={authenticate}>
                  <MobileStudentChangePass />
                </MFrame>
              </Route>

              <Route path="/rlist-filter">
                <EmptyFrame authenticate={authenticate}>
                  <RListFilter setSFilter={setSFilter}/>
                </EmptyFrame>
              </Route>

              <Route path="/slist-filter">
                <EmptyFrame authenticate={authenticate}>
                  <SListFilter />
                </EmptyFrame>
              </Route>

              <Route path="/student-changepass/:username">
                <SFrame authenticate={authenticate}>          
                  <StudentChangePass />
                </SFrame>
              </Route>

              <Route path="/student-rlist/:username">
                <SFrame authenticate={authenticate}>
                  <StudentRList />
                </SFrame>
              </Route>

               <Route path='/student-dashboard/:username'>
                <SFrame authenticate={authenticate}>
                  <StudentDashboard />
                </SFrame>
              </Route>

              <Route path="/student-approved/:username">
                <SFrame authenticate={authenticate}>
                  <StudentApproved />
                </SFrame>
              </Route>

              <Route path="/student-pending/:username">
                <SFrame authenticate={authenticate}>
                  <StudentPending />
                </SFrame>
              </Route>

              <Route path="/student-profile/:username">
                <SFrame authenticate={authenticate}>
                  <StudentProfile />
                </SFrame>
              </Route>

              <Route path="/research-abstract/:id">
                  <AbstractView />        
              </Route>

              <Route path="/research-full/:id">
                  <FullContent />        
              </Route>

              <Route path="/m-abstract/:id">
                  <MobileAbstract />        
              </Route>

              <Route path="/m-full-content/:id">
                  <MobileFull />        
              </Route>

            </Switch>
          </FilterContext.Provider>

          { pathname === views[ 0 ] ? <Redirect to="/sign-in"/> : requestedView }  
         </div>
         </SnackbarProvider>
    </InboxContext.Provider>

  );
  
}


export default App;
