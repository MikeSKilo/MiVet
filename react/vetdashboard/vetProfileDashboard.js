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
		id: 6,
		title: 'Clients',
		link: '/dashboard/vet/clients',
        icon: 'users',
        type: 'clients'
	},
];

export const AccountSettingsMenu = (id) => {
    return [
        {
            id: 1,
            title: 'Edit Profile',
            link: `/vetprofiles/${id}/edit`,
            icon: 'edit'
        },
        {
            id: 4,
            title: 'Profile details',
            link: `/vetprofiles/${id}`,
            icon: 'user'
        },
        {
            id: 6,
            title: 'Sign Out',
            link: '/dashboard/vet/signout',
            icon: 'power'
        }
    ];
};

export const VetProfileDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default VetProfileDashboardMenu;
