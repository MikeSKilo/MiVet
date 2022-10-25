import { v4 as uuid } from 'uuid';

// import media files
import ServceImage from '../../../assets/images/logos/Mi-Vet-Logo_BUG50.png'

export const InvoicesData = [
	{
		id: uuid(),
		image: ServceImage,
		title: 'Wellness Exam',
		horseName: "Horse 1",
        amount: 3145.23,
        paid: "unpaid"
	},
	{
		id: uuid(),
		image: ServceImage,
		title: 'Vaccines',
		horseName: "Horse 2",
        amount: 2611.82,
        paid: "paid"
	},
	{
		id: uuid(),
		image: ServceImage,
		title: 'Microchipping',
		horseName: "Horse 3",
        amount: 2372.19,
        paid: "paid"
	},
	{
		id: uuid(),
		image: ServceImage,
		title: 'Dentistry',
		horseName: "Horse 4",
        amount: 1145.23,
        paid: "unpaid"
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'Surgery',
		horseName: "Horse 5",
        amount: 1145.23,
        paid: "unpaid"
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'Geriatric Care',
		horseName: "Horse 6",
        amount: 1145.23,
        paid: "unpaid"
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'Hospice',
		horseName: "Horse 7",
        amount: 1145.23,
        paid: "unpaid"
    },
    {
		id: uuid(),
		image: ServceImage,
		title: 'etc.',
		horseName: "Horse 8",
        amount: 1145.23,
        paid: "unpaid"
	},
];

export default InvoicesData;
