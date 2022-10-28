export const DashboardMenu = [
	{
		id: 1,
		title: 'My Dashboard',
		link: '/dashboard/vet',
        icon: 'home',
        type: 'main'
	},
	{
		id: 2,
		title: 'My Appointments',
		link: '/dashboard/vet/appointments',
        icon: 'book',
        type: 'appointments'
	},
	{
		id: 3,
		title: 'Invoices',
		link: '/dashboard/vet/invoices',
        icon: 'shopping-bag',
        type : 'invoices'
	},
	{
		id:4,
		title: 'Reviews',
		link: '/dashboard/vet/reviews',
        icon: 'star',
        type:' reviews'
	},
	{
		id: 5,
		title: 'Earnings',
		link: '/dashboard/vet/',
        icon: 'pie-chart',
        type: 'earnings'
	},
	{
		id: 6,
		title: 'Clients',
		link: '/dashboard/vet/clients',
        icon: 'users',
        type: 'clients'
	},
	{
		id: 7,
		title: 'Payouts',
		link: '/dashboard/vet/payouts',
		icon: 'dollar-sign'
	}
];

export const AccountSettingsMenu = [
	{
		id: 1,
		title: 'Edit Profile',
		link: '/dashboard/vet/edit',
		icon: 'settings'
	},
	{
		id: 2,
		title: 'Security',
		link: '/dashboard/vet/security',
		icon: 'user'
	},
	{
		id: 3,
		title: 'Social Profiles',
		link: '/dashboard/vet/social',
		icon: 'refresh-cw'
	},
	{
		id: 4,
		title: 'Notifications',
		link: '/dashboard/vet/notification',
		icon: 'bell'
	},
	{
		id: 5,
		title: 'Profile Privacy',
		link: '/dashboard/vet/privacy',
		icon: 'lock'
	},
	{
		id: 6,
		title: 'Delete Profile',
		link: '/dashboard/vet/delete',
		icon: 'trash'
	},
	{
		id: 6,
		title: 'Sign Out',
		link: '/dashboard/vet/signout',
		icon: 'power'
	}
];

export const VetProfileDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default VetProfileDashboardMenu;
