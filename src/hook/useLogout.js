import { useDispatch} from 'react-redux';
import { logout} from './../store/user.slice';
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    localStorage.removeItem("token");
    dispatch(logout())
    navigate('/')
}