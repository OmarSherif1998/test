import { useMemo, useState } from 'react';
import BackupsTable from './components/BackupsTable';
import BackupModal from './components/BackupModal';
import DescriptionBox from './components/DescriptionBox';
const tabs = ['data', 'schema', 'manual backup'];

export default function App() {
	const [activeTab, setActiveTab] = useState('data');
	const [modalType, setModalType] = useState(null);

	const modalConfig = useMemo(() => {
		if (modalType === 'manual') {
			return {
				title: 'Start Backup',
				message: 'Are you sure you want to start a backup?',
			};
		}

		if (modalType === 'table') {
			return {
				title: 'Backup Warning',
				message:
					'If you restore this backup, anything prior to its data is going to be erased.',
			};
		}

		return { title: '', message: '' };
	}, [modalType]);

	return (
		<div className='min-h-screen bg-slate-100 text-slate-900'>
			<div className='flex min-h-screen'>
				<aside className='w-20 py-8 border-r border-slate-200 bg-slate-900'>
					<div className='flex flex-col items-center gap-5'>
						{[1, 2, 3, 4].map((item) => (
							<div
								key={item}
								className='w-10 h-10 border rounded-lg border-slate-700 bg-slate-800'
								aria-label={`placeholder-icon-${item}`}
							/>
						))}
					</div>
				</aside>

				<main className='flex-1 p-8'>
					<h1 className='text-3xl font-bold'>Database Backup</h1>

					<nav className='mt-6 border-b border-slate-300'>
						<ul className='flex gap-6'>
							{tabs.map((tab) => {
								const selected = activeTab === tab;
								return (
									<li key={tab}>
										<button
											type='button'
											onClick={() => setActiveTab(tab)}
											className={`border-b-2 px-1 pb-3 text-sm font-semibold capitalize transition ${
												selected
													? 'border-blue-600 text-blue-600'
													: 'border-transparent text-slate-600 hover:text-slate-800'
											}`}
										>
											{tab}
										</button>
									</li>
								);
							})}
						</ul>
					</nav>

					<section className='mt-6'>
						{(activeTab === 'data' || activeTab === 'schema') && (
							<BackupsTable onBackup={() => setModalType('table')} />
						)}

						{activeTab === 'manual backup' && (
							<div className='grid min-h-[350px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white'>
								<button
									type='button'
									onClick={() => setModalType('manual')}
									className='rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700'
								>
									start backup
								</button>
							</div>
						)}
					</section>
					<DescriptionBox />
				</main>
			</div>

			<BackupModal
				open={Boolean(modalType)}
				title={modalConfig.title}
				message={modalConfig.message}
				onConfirm={() => setModalType(null)}
				onCancel={() => setModalType(null)}
			/>
		</div>
	);
}
