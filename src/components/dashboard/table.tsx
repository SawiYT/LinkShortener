import React from 'react';
import { Pagination } from '@heroui/pagination';

interface DashTableProps {
	users: {
		uuid: string;
		url: string;
	}[];
}

const DashTable: React.FC<DashTableProps> = ({ users }) => {
	const [page, setPage] = React.useState(1);
	const rowsPerPage = 4;

	const pages = Math.ceil(users.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return users.slice(start, end);
	}, [page, users]);

	return (
		<div className='relative p-6'>
			<div className='overflow-hidden dark:bg-[#18181b] bg-secondary p-2 rounded-xl '>
				{/* Półwychodzący nagłówek */}
				<div className='absolute top-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#27272a] text-white px-4 py-2 rounded-xl shadow-md font-bold'>
					YOUR LINKS
				</div>
				<table className='min-w-full rounded-xl relative'>
					<thead className=''>
						<tr className=''>
							<th className='px-4 py-2 text-left border-b'>UUID</th>
							<th className='px-4 py-2 text-left border-b'>URL</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr key={item.uuid} className='border-b'>
								<td className='px-4 py-2'>
									<a href={'http://localhost:3000/' + item.uuid} className='text-blue-500'>
										localhost:3000/{item.uuid}
									</a>
								</td>
								<td className='px-4 py-2'>{item.url}</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className='flex justify-center mt-4'>
					<Pagination
						isCompact
						showControls
						showShadow
						color='secondary'
						className=' overflow-hidden'
						page={page}
						total={pages}
						onChange={page => setPage(page)}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashTable;
