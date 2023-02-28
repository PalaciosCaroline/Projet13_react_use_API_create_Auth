import { useDispatch, useSelector } from "react-redux";
import { NavLink,useNavigate } from 'react-router-dom'
import Logo from './../assets/argentBankLogo.png'
import { FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import { logout} from '../store/user.slice';

export default function HeaderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userFirstName = useSelector((state) => state.user.userFirstName); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout())
    navigate('/')
  }

  return (
    <header>
        <nav className="main-nav">
           <NavLink to='/' className="main-nav-logo">
                <img src={Logo} className="main-nav-logo-image" alt="ArgentBank logo" />
                <h1 className="sr-only">Argent Bank</h1>
           </NavLink> 
           <div className='box_sign'>
                {isAuthenticated ? 
                 (<><NavLink className="main-nav-item router-link-exact-active" to="/profile"><FaUserCircle className='nav-icon' />{userFirstName}</NavLink>
                 <button className="main-nav-item btnLogout" onClick={handleLogout }>
                 <FaSignInAlt className='nav-icon'/>
                  <span>Sign Out</span>
                </button></>) 
                :
                 (<NavLink className={({ isActive }) =>
                 `main-nav-item ${isActive ? ' router-link-exact-active' : ''}`} to="/login"><FaUserCircle className='nav-icon' size="30px"/><span>Sign In</span></NavLink>)
                }
            </div>
        </nav>
    </header>
  )
}
