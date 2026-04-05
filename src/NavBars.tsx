import type React from "react"
import { NavLink } from "react-router"

interface RouteLink {
  label: string,
  to: string,
  children?: RouteLink[]
}

const links: RouteLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to:'/dashboard' },
  { label: 'Create Board', to:'/create-board' },
  { label: 'My Boards', to: '/boards-created' },
  { label: 'Create Event', to:'/create-event' },
  { label: 'My Events', to:'/events-created' },
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

export const TopNav: React.FC = () => {
  return (
    <nav className="h-full grid gap-1 overflow-auto">
      <ul className="flex">
        {
          links.map(link => (
            <NavItem key={link.to} link={link} level={0} />
          ))
        }
      </ul>
    </nav>
  )
}