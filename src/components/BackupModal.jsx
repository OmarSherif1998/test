export default function BackupModal({
	open,
	title,
	message,
	onConfirm,
	onCancel,
}) {
	if (!open) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/50'>
			<div className='w-full max-w-md p-6 bg-white shadow-2xl rounded-xl'>
				<h2 className='text-xl font-semibold text-slate-900'>{title}</h2>
				<p className='mt-3 text-sm text-slate-600'>{message}</p>

				<div className='flex justify-end gap-3 mt-6'>
					<button
						type='button'
						onClick={onCancel}
						className='px-4 py-2 text-sm font-medium transition border rounded-md border-slate-300 text-slate-700 hover:bg-slate-100'
					>
						Cancel
					</button>
					<button
						type='button'
						onClick={onConfirm}
						className='px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-700'
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}
