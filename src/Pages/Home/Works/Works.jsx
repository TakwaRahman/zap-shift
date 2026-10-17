import { howItWorksData } from "../../../Data/data";


const Works = () => {
    return (
        <section>
            <h2 className="text-3xl font-bold mb-8">How it Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorksData.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className="bg-gray-100 p-6 rounded-xl"
                        >
                            <Icon className="text-3xl mb-4" />

                            <h3 className="font-bold text-lg mb-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Works;