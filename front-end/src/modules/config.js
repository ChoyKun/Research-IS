import axios from 'axios';
import Cookies from 'js-cookie';

const token =  Cookies.get('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// tapos lalagay mo to sa lahat ng files sa views file?s alin? as in sa lahat?
export default axios;