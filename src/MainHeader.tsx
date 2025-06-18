import { NavLink } from 'react-router';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

export const MainHeader: React.FC<object> = () => {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  return (
    <header>
      <div className="relative bg-gray-400 h-15">
        <div className="sm:mx-20 ml-20">
          <div className="flex justify-between items-center h-15">
            <div className="lg:flex items-center lg:flex-1 lg:w-0">
              {isLoggedIn ? (
                <button onClick={logOut}>Log Out</button>
              ) : (
                <>
                  <NavLink to="/login" className="ease-in duration-200 mr-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-full text-base font-medium text-white outline outline-white bg-black hover:bg-white hover:outline-0 hover:text-black">
                    Log In
                  </NavLink>
                  <NavLink to="/register" className="transition-all whitespace-nowrap text-base font-medium text-teal-600 hover:text-white">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
