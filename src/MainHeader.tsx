import { NavLink } from 'react-router';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import { TopNav } from './NavBars';
import { MainHeaderNavLinks } from './NavBarLinks';

export const MainHeader: React.FC<object> = () => {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  return (
    <header>
      <div className="relative bg-[#c8c8c8] h-10 shadow-sm shadow-black/50">
        <div className="mx-20">
          <div className="flex items-center h-10">
            <TopNav links={MainHeaderNavLinks} />
            <div className="flex items-center flex-1 justify-end">
              {isLoggedIn ? (
                <button type='button' onClick={logOut}>Log Out</button>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className="ease-in duration-200 mr-8 whitespace-nowrap inline-flex items-center justify-center 
                               px-3 py-1 rounded-full text-base font-medium text-white outline outline-white bg-black
                               hover:bg-white hover:outline-0 hover:text-black"
                  >
                    Log In
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="transition-all whitespace-nowrap text-base font-medium text-teal-600 hover:text-white"
                  >
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
