import type React from "react"
import { NavLink } from "react-router"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import type { RouteLink, NavItem } from "./NavBarLinks";

type DropDownMenuProps = {
  items: NavItem[];
  depth?: number;
}
function DropDownMenu({ items, depth = 0 }: DropDownMenuProps) {
  const menuPositionClass = 
    depth === 0
      ? "absolute left-0 top-full"
      : "absolute left-full top-0"

  return (
    <ul
      className={[
        menuPositionClass,
        "z-50 hidden min-w-56 rounded-md border border-gray-200 bg-white p-1 shadow-md",
        "group-hover:block"
      ].join(" ")}
    >
      {items.map((item) => (
        <DropDownMenuItem key={`${item.label}-${depth}`} item={item} depth={depth} />
      ))}
    </ul>
  )
}

type DropDownMenuItemProps = {
  item: NavItem;
  depth: number;
}

function DropDownMenuItem({ item, depth }: DropDownMenuItemProps) {
  if (item.type === "link") {
    return (
      <li className="list-none">
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            [
              "block whitespace-nowrap rounded px-3 py-2 transition-colors",
              isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50",
            ].join(" ")
          }
        >
          {item.label}
        </NavLink>
      </li>
    )
  }

  return (
    <li className="gorup relative list-none">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded px-3 py-2 text-left transition-color hover:bg-gray-50"
      >
        <span>item.label</span>
        <span className="text-sm">{depth === 0 ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}</span>
      </button>

      <DropDownMenu items={item.children} depth={depth + 1} />
    </li>
  )
}

type DropDownTopNavProps = {
  items: NavItem[];
}

export function DropDownTopNav({ items }: DropDownTopNavProps) {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        {items.map((item => {
          if (item.type === "link") {
            return (
              <li key={item.label} className="list-none">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "block rounded px-4 py-2 transitions-colors",
                      isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          }

          return (
            <li key={item.label} className="group relative list-none">
              <button
                type="button"
                className="flex items-center gap-1 rounded px-4 py-2 transition-colors hover:bg-gray-100"
              >
                <span>{item.label}</span>
                <span className="text-xs"><ChevronDownIcon className="h-4 w-4" /></span>
              </button>

              <DropDownMenu items={item.children} depth={0} />
            </li>
          )
        }))}
      </ul>
    </nav>
  )
}

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

type SideNavProps = {
  links: RouteLink[];
}

export function SideNav({ links }: SideNavProps) {
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

type TopNavProps = {
  links: RouteLink[];
}

export function TopNav({ links }: TopNavProps) {
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