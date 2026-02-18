const ProgressBar = ({ step, totalSteps = 5 }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-red-500">
                    ধাপ {step}/{totalSteps}
                </span>
                <span className="text-sm font-semibold text-red-500">
                    সম্পূর্ণ করুন: {Math.round((step / totalSteps) * 100)}%
                </span>
            </div>
            <div className="flex gap-2">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                    <div
                        key={s}
                        className={`h-2 flex-1 rounded-full transition-all duration-500 ${s <= step ? "bg-red-500" : "bg-slate-100"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;