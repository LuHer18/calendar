import { useDispatch, useSelector } from "react-redux"
import calendarAPi from "../api/calendarAPi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const starLogin = async({email, password}) => {
        dispatch(onChecking());

        try {

            const {data} = await calendarAPi.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid}));
            
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }
    const starRegister = async({name, email, password})=> {
        dispatch(onChecking());
        try {

            const {data} = await calendarAPi.post('/auth/new', {name, email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid}));
            
        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || '--'))

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }
    
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token')

        if(!token) return dispatch(onLogout());

        try {

            const {data} = await calendarAPi.get('/auth/renew')
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid}));
            
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const starLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //Propiedades
        status,
        user,
        errorMessage,


        //Métodos
        starLogin,
        starRegister,
        checkAuthToken,
        starLogout

    }
}