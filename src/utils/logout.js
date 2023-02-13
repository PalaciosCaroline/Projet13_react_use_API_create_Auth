import { redirect } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { logout, setIsAuthentificated } from './../store/user.slice';

//pour l'instant non utiliser
export default function LogoutUser() {
  const dispatch = useDispatch();
 
    dispatch(logout());
    dispatch(setIsAuthentificated(false));
    redirect("/");

  return (
    <div>
      Logging out...
    </div>
  );
}