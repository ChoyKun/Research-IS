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
import FacultyUpload from './views/FacultyUpload.js';
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
  '/MIS-upload',
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


  function isIncognito(){
    const largeStrings = [
  // These strings are 5000 characters long. I generated them by running
  // base64 /dev/urandom -w 0 | head -c 5000
  'odE141SCRsNhfNBb95VhqRubp+fXTF1Dricc0G9wWrQcXRvu3uhGRh4t2TiUZF1BdSKLOrnG...',
  'pdfhLvvnkBGjbuR1/0WcCcM2li/cYOQ/wZGPAofjBXxo6PvhoEAWYtEMtTlbcLm+dPxwQFm8...',
  'Xfo5aKCHnIQc9zMtUWmGYiwzBJuDQLEVyg0t9ID2ZsCVMnVD7h8juo9Bmd+e2VdmofvGkFoa...',
  'jsYalJDnye4x5Vvl9w+F7aRrVx+WcJT5E7rzB9UNxb7iyY+mFAvsllN95ZDom50+GhhBuT+l...',
  'QcaZ/f91np7UkMvy4jrJks5Iogpgik0JZA0kCeXEPc2vdFYHKKIVT+nKmrva0qUee14LXh9Y...'
]
const SIZE = 6*1024*1024 // 6 MB
// Completely arbitrary numbers. Probably make them as high as you can tolerate:
const NUM_BENCHMARK_ITERATIONS = 200
const NUM_MEASUREMENTS = 100

const writeToFile = (fs, data) => {
  return new Promise((resolve) => {
    fs.root.getFile('data', { create: true }, (fileEntry) => {
      fileEntry.createWriter((fileWriter) => {
        fileWriter.onwriteend = resolve

        var blob = new Blob([data], { type: 'text/plain' });
        fileWriter.write(blob);
      })
    })
  })
}

const runBenchmark = async (fs) => {
  const time = new Date()
  for (let i = 0; i < NUM_BENCHMARK_ITERATIONS; i++) {
    for (let j = 0; j < largeStrings.length; j++) {
      await writeToFile(fs, largeStrings[j])
    }
  }
  return new Date() - time
}

const onInitFs = async (fs) => {
  const timings = []
  for (let i = 0; i < NUM_MEASUREMENTS; i++) {
    timings.push(await runBenchmark(fs))
  }

  console.log(timings)
}

window.webkitRequestFileSystem(window.TEMPORARY, SIZE, onInitFs)
}

isIncognito();
  


  return (
   <div className="app">
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

        <Route path="/MIS-upload/:username">
          <FacultyFrame>
            <FacultyUpload />
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
            <RListFilter />
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
          <SFrame>

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

    { pathname === views[ 0 ] ? <Redirect to="/sign-in"/> : requestedView }  
   </div>
  );
  
}


export default App;
