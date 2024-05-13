import { useDispatch, useSelector } from "react-redux"
import calendarAPi from "../api/calendarAPi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

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
    

    return {
        //Propiedades
        status,
        user,
        errorMessage,


        //Métodos
        starLogin

    }
}