import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import riderImg from "../../assets/agent-pending.png"; // ছবি path apnar project onujayi update korben

const Rider = () => {

    const servicesCenter = useLoaderData() || []; // ডাটা না থাকলে যাতে ক্রাশ না করে তাই fallback []
    const { user } = useAuth();

    // ইউনিক রিজিয়ন বের করা
    const regionDuplicate = servicesCenter.map(c => c.region);
    const regions = [...new Set(regionDuplicate)];

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const axiosSecure = useAxiosSecure();

    // region এর ভ্যালু ট্র্যাক করা হচ্ছে
    const region = useWatch({ control, name: 'region' });

    // রিজিয়ন অনুযায়ী ইউনিক ডিস্ট্রিক্ট ফিল্টার করার ফাংশন
    const handleByDistrict = (region) => {
        const districtDuplicate = servicesCenter
            .filter(item => item.region === region)
            .map(item => item.district);

        // ডিস্ট্রিক্ট ডুপ্লিকেট রিমুভ করা হলো
        return [...new Set(districtDuplicate)];
    };

    // সিলেক্টেড রিজিয়নের ডিস্ট্রিক্ট লিস্ট
    const districts = region ? handleByDistrict(region) : [];

    const handleBeARider = (data) => {
        console.log(data);

        data.email = user?.email;
        data.status = 'pending';
        data.applied_at = new Date().toISOString();

        Swal.fire({
            title: "Are you sure?",
            text: "You want to apply as a Rider!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Apply!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.post('/riders', data).then(res => {
                    if (res.data.insertedId) {
                        reset();
                        navigate('/');
                        Swal.fire({
                            title: "Application Submitted!",
                            text: "Your rider application is pending for approval.",
                            icon: "success",
                            draggable: true,
                            timer: 2500
                        });
                    }
                });

            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-10 border-2 border-dashed border-blue-300 rounded-2xl">

            {/* Top Heading */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-[#03373D] mb-3">Be a Rider</h1>
                <p className="text-gray-500 max-w-2xl">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#03373D] mb-6">Tell us about yourself</h2>

                <div className="flex flex-col md:flex-row gap-10">

                    {/* Left: Form */}
                    <form
                        onSubmit={handleSubmit(handleBeARider)}
                        className="flex-1 space-y-4"
                    >
                        <div>
                            <label className="font-medium">Your Name</label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                placeholder="Your Name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="input input-bordered w-full mt-1"
                            />
                            <p className="text-red-500 text-sm">{errors.name?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">Driving License Number</label>
                            <input
                                type="text"
                                placeholder="Driving License Number"
                                {...register("licenseNumber", {
                                    required: "Driving license number is required",
                                })}
                                className="input input-bordered w-full mt-1"
                            />
                            <p className="text-red-500 text-sm">{errors.licenseNumber?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">Your Email</label>
                            <input
                                type="email"
                                readOnly
                                defaultValue={user?.email}
                                placeholder="Your Email"
                                {...register("email")}
                                className="input input-bordered w-full mt-1 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Your Region</label>
                            <select
                                {...register("region", {
                                    required: "Select your region",
                                })}
                                className="select select-bordered w-full mt-1"
                            >
                                <option value="">Select your Region</option>
                                {regions.map((r, idx) => (
                                    <option key={idx} value={r}>{r}</option>
                                ))}
                            </select>
                            <p className="text-red-500 text-sm">{errors.region?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">Your District</label>
                            <select
                                {...register("district", {
                                    required: "Select your district",
                                })}
                                className="select select-bordered w-full mt-1"
                                disabled={!region} // রিজিয়ন সিলেক্ট না করলে এটি ডিজেবল থাকবে
                            >
                                <option value="">Select your District</option>
                                {districts.map((d, idx) => (
                                    <option key={idx} value={d}>{d}</option>
                                ))}
                            </select>
                            <p className="text-red-500 text-sm">{errors.district?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">NID No</label>
                            <input
                                type="text"
                                placeholder="NID"
                                {...register("nid", {
                                    required: "NID number is required",
                                })}
                                className="input input-bordered w-full mt-1"
                            />
                            <p className="text-red-500 text-sm">{errors.nid?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                {...register("phone", {
                                    required: "Phone number is required",
                                })}
                                className="input input-bordered w-full mt-1"
                            />
                            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">Bike Brand Model and Year</label>
                            <input
                                type="text"
                                placeholder="Bike Brand Model and Year"
                                {...register("bikeInfo", {
                                    required: "Bike brand, model and year is required",
                                })}
                                className="input input-bordered w-full mt-1"
                            />
                            <p className="text-red-500 text-sm">{errors.bikeInfo?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">Bike Registration Number</label>
                            <input
                                type="text"
                                placeholder="Bike Registration Number"
                                {...register("bikeRegNumber", {
                                    required: "Bike registration number is required",
                                })}
                                className="input input-bordered w-full mt-1"
                            />
                            <p className="text-red-500 text-sm">{errors.bikeRegNumber?.message}</p>
                        </div>

                        <div>
                            <label className="font-medium">Tell Us About Yourself</label>
                            <textarea
                                rows="3"
                                placeholder="Tell Us About Yourself"
                                {...register("aboutYourself")}
                                className="textarea textarea-bordered w-full mt-1"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn bg-lime-400 hover:bg-lime-500 text-black border-none px-8 w-full mt-4"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Right: Image */}
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            src={riderImg}
                            alt="Be a Rider"
                            className="max-w-md w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rider;