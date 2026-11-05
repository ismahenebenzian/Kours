
export default function StatsCard({ title, value, icon }: { title: string; value: string | number; icon?: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight justify-start gap-4">{value}  {icon && <div className="absolute top-4 right-4">{icon}</div>}</p>
          </div>
        
    )}