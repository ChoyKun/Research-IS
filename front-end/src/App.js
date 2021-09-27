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
import MobileRList from './views/MobileRList.js';
import MobileRListFilter from './views/MobileRListFilter.js';
import MobileStudentChangePass from './views/MobileStudentChangePass.js';
import MobileStudentCopyright from './views/MobileStudentCopyright.js';
import MobileStudentFavorites from './views/MobileStudentFavorites.js';
import RListFilter from './views/RListFilter.js';
import SListFilter from './views/SListFilter.js';
import StudentChangePass from './views/StudentChangePass.js';
import StudentFavorites from './views/StudentFavorites.js';
import StudentCopyRight from './views/StudentCopyRight.js';
import StudentRList from './views/StudentRList.js';
import StudentProfile from './views/StudentProfile.js';
import StudentPending from './views/StudentPending.js';
import StudentApproved from './views/StudentApproved.js';



import AdminFrame from './views/AdminFrame';
import FacultyFrame from './views/FacultyFrame';
import SFrame from './views/SFrame';
import EmptyFrame from './views/EmptyFrame';
import MFrame from './views/MFrame'





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
  '/m-favorites',
  '/rlist-filter',
  '/slist-filter',
  '/student-changepass',
  '/student-copyright',
  '/student-favorites',
  '/student-rlist',
  '/student-approved',
  '/student-pending',
  '/student-profile',
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

        <Route path="/admin-profile/:username">
          <AdminFrame>
            <AdminProfile />
          </AdminFrame>
        </Route>

        <Route path="/admin-access">
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

        <Route path="/admin-new-coor/:username">
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

        <Route path="/m-copyright">
          <MFrame>
            <MobileStudentCopyright />
          </MFrame>
        </Route>

        <Route path="/m-favorites">
          <MFrame>
            <MobileStudentFavorites />
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

        <Route path="/student-favorites/:username">
          <SFrame>
            <StudentFavorites />
          </SFrame>
        </Route>

        <Route path="/student-copyright/:username">
          <SFrame>
            <StudentCopyRight />
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
     </Switch>
   </div>
  );
}

export default App;
