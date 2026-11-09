

interface SeggestionCardProps {
    title: string;
    description: string;
    imageSrc: string;
    rating: number;
    reviews: number;
}


export default function SeggestionCard({ title, description, imageSrc, rating, reviews }: SeggestionCardProps) {
    return (

        <div className="flex justify-center gap-4 w-full">

            <div className="p-4 rounded-2xl  flex justify-center gap-4 border border-slate-100 bg-slate-50/50 hover:shadow-sm transition-all">
                <img src={imageSrc} alt="" />
                <div>
                    <span className="text-xs font-bold text-slate-900 block truncate">{title}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{description}</span>
                    <div className="flex items-center justify-between mt-3 text-xs">
                        <span className="text-amber-500 font-bold">★ {rating} <span className="text-slate-400 font-normal">({reviews} avis)</span></span>
                    </div>
                </div>
            </div>
        </div>

    );
}