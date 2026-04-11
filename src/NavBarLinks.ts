export interface RouteLink {
  label: string,
  to: string,
  children?: RouteLink[]
}

export type NavLinkItem = {
  type: "link";
  label: string;
  to: string;
}

export type NavGroupItem = {
  type: "group";
  label: string;
  children: NavItem[];
}

export type NavItem = NavLinkItem | NavGroupItem

export const MainHeaderNavLinks: RouteLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to:'/dashboard' },
  { label: 'Create Board', to:'/create-board' },
  { label: 'My Boards', to: '/boards-created' },
  { label: 'Create Event', to:'/create-event' },
  { label: 'My Events', to:'/events-created' },
]

export const mainEventLinks: NavItem[] = [
  { type: "link",
    label: 'Overview', 
    to: '/event/:id' 
  },
  { 
    type: "group",
    label: 'Teams', 
    children: [
      { 
        type: "link",
        label: 'My Team Page',
        to: '/event/:id/team/:id'
      },
      {
        type: "link",
        label: 'All Teams Info',
        to: 'event/:id/all-teams-info'
      },
    ]
  },
]

export const eventAdminActions: NavItem[] = [
  {
    type: "group",
    label: "Admin",
    children: [
      {
        type: "link",
        label: "Edit Event",
        to: 'event/:id/edit'
      },
      {
        type: "link",
        label: "Open Event",
        to: 'event/:id/open'
      },
      {
        type: "link",
        label: "Assign Teams",
        to: 'event/:id/participants'
      },
      {
        type: "link",
        label: "View All Submissions",
        to: "event/:id/all-submissions"
      },

    ]
  }
]