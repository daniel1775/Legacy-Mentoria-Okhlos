import {Link} from 'react-router-dom'
import './userLink.css'

const UserLink = ({user, handleLogout}) => {
  return (
    <p className='drop-nav'>
      <Link className='link' to='/' onClick={handleLogout}>
        LOGOUT
      </Link>
      {/* <Link className='link' to='#'>
        <img src={user.avatar} alt='' /> {user.name}{' '}
        <i className='fas fa-angle-down'></i>
      </Link> */}
      {/* <ul className='dropdown'>
        <li>
          <Link className='link' to='/profile'>Profile</Link>
        </li>
        <li>
          <Link className='link' to='/' onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul> */}
    </p>
  )
}

export default UserLink