import type React from "react"
import { NavLink } from "react-router"

interface RouteLink {
  label: string,
  to: string,
  children?: RouteLink[]
}

const links: RouteLink[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Dashboard', 
    to:'/dashboard',
    children: [
      { label: 'Create Board', to:'dashboard/create-board' },
      { label: 'Created', to: 'dashboard/boards-created' },
      { label: 'Moderator', to: 'dashboard/moderator' }
    ]
  },
  {
    label: 'Active Games', 
    to:'/active-games',
    children: [
      { label: 'My Games', to:'active-games/my-games' },
      { 
        label: 'Browse', 
        to: 'active-games/browse',
        children: [
          { label: 'Popular', to: 'active-games/browse/popular' },
          { label: 'Recent', to: 'active-games/browse/recent'}
        ] 
      },
    ]
  }
]

const NavItem: React.FC<{ link: RouteLink; level: number}> = ({ link, level}) => {
  const indent = ['px-4', 'pl-8', 'pl-12', 'pl-16'][level] || 'pl-16'
  return (
    <li>
      <NavLink 
        to={link.to}
        end={link.children == null}
        className={({isActive}) =>
          [
            'block py-2 rounded transition-colors',
            indent,
            isActive ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
          ].join(' ')
        }
      >
        {link.label}
      </NavLink>

      {link.children && (
        <ul className="mt-1 space-y-1">
          {link.children.map(child => (
            <NavItem key={child.to} link={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export const SideNav: React.FC = () => {
  return (
    <nav className="w-64 bg-white border-r h-full flex-shrink-0 overflow-auto">
      <ul className="p-4 space-y-2">
        {
          links.map(link => (
            <NavItem key={link.to} link={link} level={0} />
          ))
        }
      </ul>
    </nav>
  )
}