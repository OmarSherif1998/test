export default function BackupsTable({ onBackup }) {
	const rows = [
		{ id: 1, name: 'Primary Backup' },
		{ id: 2, name: 'Secondary Backup' },
		{ id: 3, name: 'Archive Backup' },
	];

	return (
		<div className='overflow-hidden bg-white border rounded-lg shadow-sm border-slate-200'>
			<table className='min-w-full divide-y divide-slate-200'>
				<thead className='bg-slate-50'>
					<tr>
						<th className='px-6 py-3 text-xs font-semibold tracking-wide text-left uppercase text-slate-600'>
							id
						</th>
						<th className='px-6 py-3 text-xs font-semibold tracking-wide text-left uppercase text-slate-600'>
							name
						</th>
						<th className='px-6 py-3 text-xs font-semibold tracking-wide text-left uppercase text-slate-600'>
							action
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-slate-200'>
					{rows.map((row) => (
						<tr key={row.id} className='hover:bg-slate-50'>
							<td className='px-6 py-4 text-sm text-slate-700'>{row.id}</td>
							<td className='px-6 py-4 text-sm text-slate-700'>{row.name}</td>
							<td className='px-6 py-4'>
								<button
									type='button'
									onClick={onBackup}
									className='rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700'
								>
									Restore
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
