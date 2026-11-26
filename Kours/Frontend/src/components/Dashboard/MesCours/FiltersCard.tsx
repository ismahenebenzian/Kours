interface props {
    filters: string[];
    activeFilter: string;
    onFilterChange: React.Dispatch<React.SetStateAction<string>>;
    getFilterCount: (filter: string) => number;
}

const FiltersCard: React.FC<props> = ({ filters, activeFilter, onFilterChange, getFilterCount }) => {
    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/60 pb-4">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        activeFilter === filter
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                    }`}
                >
                    {filter} <span className="text-slate-400">({getFilterCount(filter)})</span>
                </button>
            ))}
        </div>
    );
};

export default FiltersCard;
