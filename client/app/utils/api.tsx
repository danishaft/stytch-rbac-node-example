import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
});

const sessionToken = Cookies.get('session_token')
const ist = Cookies.get('intermediate_session_token');

if(ist){
    api.defaults.headers.common['x-intermediate-session-token'] = ist
}
if(sessionToken){
    api.defaults.headers.common['x-session-token'] = sessionToken
}

export default api;