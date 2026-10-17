import { features } from "../../Data/support";

const Support = () => {
    return (
        <section className="space-y-6 mt-30">
            {features.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm"
                >
                    <div className="w-40 flex-shrink-0">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full object-contain"
                        />
                    </div>

                    <div className="hidden md:block h-24 border-l border-dashed border-slate-300"></div>

                    <div>
                        <h3 className="text-2xl font-bold text-[#03373D] mb-3">
                            {item.title}
                        </h3>

                        <p className="text-slate-500 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Support;