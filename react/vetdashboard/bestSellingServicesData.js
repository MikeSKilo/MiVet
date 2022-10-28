import { v4 as uuid } from 'uuid';
import ServceImage from '../../../assets/images/logos/Mi-Vet-Logo_BUG50.png'

export const BestSellingCoursesData = [
	{
		id: uuid(),
		image: ServceImage,
		title: 'Wellness Exam',
		sales: 34,
		amount: 3145.23
	},
	{
		id: uuid(),
		image: ServceImage,
		title: 'Vaccines',
		sales: 30,
		amount: 2611.82
	},
	{
		id: uuid(),
		image: ServceImage,
		title: 'Microchipping',
		sales: 26,
		amount: 2372.19
	},
	{
		id: uuid(),
		image: ServceImage,
		title: 'Dentistry',
		sales: 20,
		amount: 1145.23
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'Surgery',
		sales: 20,
		amount: 1145.23
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'Geriatric Care',
		sales: 20,
		amount: 1145.23
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'Hospice',
		sales: 20,
		amount: 1145.23
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'etc.',
		sales: 20,
		amount: 1145.23
	},
];

export default BestSellingCoursesData;
