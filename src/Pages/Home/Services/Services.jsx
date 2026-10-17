import { services } from "../../../Data/service";


const Services = () => {
    return (
        <section className="bg-secondary p-10 rounded-4xl mt-50 lg:p-20 md:p-15">
            <div className="text-white">
                <h4 className="text-3xl font-bold mb-8 text-center">Our Services</h4>
                <p className="text-center px-4 mb-10 md:px-40 lg:px-60">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((item) => {

                    return (
                        <div
                            key={item.id}
                            className="bg-gray-100 p-6 rounded-xl flex flex-col justify-center items-center text-center hover:bg-primary"
                        >
                            <img
                                src={item.icon}
                                alt={item.title}
                                className="w-16 h-16 mb-4"
                            />

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

export default Services;