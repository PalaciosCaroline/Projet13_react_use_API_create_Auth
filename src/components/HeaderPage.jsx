import React,  { useEffect }  from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { logout } from './../store/user.slice';
// import { useHistory } from 'react-router-dom';
import { Link,useNavigate } from 'react-router-dom'
import Logo from './../assets/argentBankLogo.png'
import { FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import { logout} from '../store/user.slice';

export default function HeaderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthentificated = useSelector((state) => state.user.isAuthentificated);

  const userFirstName = useSelector((state) => state.user.userFirstName); 

    const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(logout())
      navigate('/')
    }

  return (
    <header>
        <nav className="main-nav">
           <Link to='/' className="main-nav-logo">
                <img src={Logo} className="main-nav-logo-image" alt="ArgentBank logo" />
                <h1 className="sr-only">Argent Bank</h1>
           </Link> 
           <div className='box_sign'>
              <FaUserCircle />
                {isAuthentificated ? 
                 (<Link className="main-nav-item" to="/profile">{userFirstName}</Link>) :
                 (<Link className="main-nav-item" to="/login" ><span>Sign In</span></Link>)
                }
                {isAuthentificated && 
                (<button className="main-nav-item" href="#" onClick={handleLogout }>
                 <FaSignInAlt/>
                  <span>Sign Out</span>
                </button>)
                }
            </div>
        </nav>
    </header>
  )
}
