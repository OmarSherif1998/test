import { useMemo, useState } from 'react'

const tabs = ['data', 'schema', 'manual backup']

const rows = [
  { id: 1, name: 'Primary Backup' },
  { id: 2, name: 'Secondary Backup' },
  { id: 3, name: 'Archive Backup' },
]

function BackupModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-3 text-sm text-slate-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

function BackupsTable({ onBackup }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">id</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-700">{row.id}</td>
              <td className="px-6 py-4 text-sm text-slate-700">{row.name}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={onBackup}
                  className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                  Backup
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('data')
  const [modalType, setModalType] = useState(null)

  const modalConfig = useMemo(() => {
    if (modalType === 'manual') {
      return {
        title: 'Start Backup',
        message: 'Are you sure you want to start a backup?',
      }
    }

    if (modalType === 'table') {
      return {
        title: 'Backup Warning',
        message: 'If you restore this backup, anything prior to its data is going to be erased.',
      }
    }

    return { title: '', message: '' }
  }, [modalType])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-20 border-r border-slate-200 bg-slate-900 py-8">
          <div className="flex flex-col items-center gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-10 w-10 rounded-lg border border-slate-700 bg-slate-800"
                aria-label={`placeholder-icon-${item}`}
              />
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold">Database Backup</h1>

          <nav className="mt-6 border-b border-slate-300">
            <ul className="flex gap-6">
              {tabs.map((tab) => {
                const selected = activeTab === tab
                return (
                  <li key={tab}>
                    <button
                      type="button"
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
                )
              })}
            </ul>
          </nav>

          <section className="mt-6">
            {(activeTab === 'data' || activeTab === 'schema') && (
              <BackupsTable onBackup={() => setModalType('table')} />
            )}

            {activeTab === 'manual backup' && (
              <div className="grid min-h-[350px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white">
                <button
                  type="button"
                  onClick={() => setModalType('manual')}
                  className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  start backup
                </button>
              </div>
            )}
          </section>
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
  )
}
