
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const SendParcel = () => {

    const servicesCenter = useLoaderData() || []; // ডাটা না থাকলে যাতে ক্রাশ না করে তাই fallback []
    const { user } = useAuth();

    // ইউনিক রিজিয়ন বের করা
    const regionDuplicate = servicesCenter.map(c => c.region);
    // console.log(regionDuplicate)
    const regions = [...new Set(regionDuplicate)];
    // console.log(regions)

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();


    const axiosSecure = useAxiosSecure();

    // senderRegion এর ভ্যালু ট্র্যাক করা হচ্ছে
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    // রিজিয়ন অনুযায়ী ইউনিক ডিস্ট্রিক্ট ফিল্টার করার ফাংশন
    const handleByDistrict = (region) => {
        const districtDuplicate = servicesCenter
            .filter(item => item.region === region)
            .map(item => item.district);

        // ডিস্ট্রিক্ট ডুপ্লিকেট রিমুভ করা হলো
        return [...new Set(districtDuplicate)];
    };

    // সিলেক্টেড রিজিয়নের ডিস্ট্রিক্ট লিস্ট
    const senderDistricts = senderRegion ? handleByDistrict(senderRegion) : [];
    const receiverDistricts = receiverRegion ? handleByDistrict(receiverRegion) : [];

    const handleSendParcel = (data) => {
        // console.log(data);
        console.log(data)

        const isDocument = data.parcelType === 'Document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);


        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;


                cost = minCharge + extraCharge;
            }
        }

        console.log('cost', cost)


        data.cost = cost;
        data.senderEmail = user.email;


        Swal.fire({
            title: "Are you sure?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {
            if (result.isConfirmed)

                console.log(data);

            axiosSecure.post('/parcels', data).then(res => {
                if (res.data.insertedId) {
                    navigate('/dashboard/my-parcel')
                    Swal.fire({
                        title: "Drag me!",
                        icon: "success",
                        draggable: true,
                        timer: 2500
                    });
                }
            })



        });
    };

    return (
        <div className="max-w-7xl mx-auto p-10">
            <h1 className="text-5xl font-bold text-[#03373D] mb-4">
                Send A Parcel
            </h1>

            <p className="text-lg font-semibold mb-8">
                Enter your parcel details
            </p>

            <form onSubmit={handleSubmit(handleSendParcel)}>
                <div className="border rounded-xl p-8">

                    {/* Parcel Type */}
                    <div className="flex gap-10 mb-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="Document"
                                {...register("parcelType")}
                                defaultChecked
                                className="radio radio-success"
                            />
                            <span>Document</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="Not-Document"
                                {...register("parcelType")}
                                className="radio radio-success"
                            />
                            <span>Not-Document</span>
                        </label>
                    </div>

                    {/* Parcel Info */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        <div>
                            <label className="font-semibold">Parcel Name</label>
                            <input
                                type="text"
                                placeholder="Parcel Name"
                                {...register("parcelName", {
                                    required: "Parcel name is required",
                                })}
                                className="input input-bordered w-full mt-2"
                            />
                            <p className="text-red-500 text-sm mt-1">
                                {errors.parcelName?.message}
                            </p>
                        </div>

                        <div>
                            <label className="font-semibold">Parcel Weight (KG)</label>
                            <input
                                type="number"
                                placeholder="Parcel Weight"
                                {...register("parcelWeight")}
                                className="input input-bordered w-full mt-2"
                            />
                        </div>
                    </div>

                    {/* Sender & Receiver */}
                    <div className="grid md:grid-cols-2 gap-10">

                        {/* Sender */}
                        <div>
                            <h2 className="text-xl font-bold mb-5">Sender Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label>Sender Name</label>
                                    <input
                                        type="text"
                                        placeholder="Sender Name"
                                        {...register("senderName", {
                                            required: "Sender Name is required",
                                        })}
                                        className="input input-bordered w-full mt-1"
                                    />
                                    <p className="text-red-500 text-sm">
                                        {errors.senderName?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        {...register("senderAddress", {
                                            required: "Address is required",
                                        })}
                                        className="input input-bordered w-full mt-1"
                                    />
                                    <p className="text-red-500 text-sm">
                                        {errors.senderAddress?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Sender Phone No</label>
                                    <input
                                        type="text"
                                        placeholder="Sender Phone No"
                                        {...register("senderPhone", {
                                            required: "Phone Number is required",
                                        })}
                                        className="input input-bordered w-full mt-1"
                                    />
                                    <p className="text-red-500 text-sm">
                                        {errors.senderPhone?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Your Region</label>
                                    <select
                                        {...register("senderRegion", {
                                            required: "Select your region",
                                        })}
                                        className="select select-bordered w-full mt-1"
                                    >
                                        <option value="">Select Region</option>
                                        {regions.map((region) => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-red-500 text-sm">
                                        {errors.senderRegion?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Your District</label>
                                    <select
                                        {...register("senderDistrict", {
                                            required: "Select your district",
                                        })}
                                        className="select select-bordered w-full mt-1"
                                        disabled={!senderRegion} // রিজিয়ন সিলেক্ট না করলে এটি ডিজেবল থাকবে
                                    >
                                        <option value="">Select District</option>
                                        {senderDistricts.map((district, idx) => (
                                            <option key={idx} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-red-500 text-sm">
                                        {errors.senderDistrict?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Pickup Instruction</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Pickup Instruction"
                                        {...register("pickupInstruction")}
                                        className="textarea textarea-bordered w-full mt-1"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Receiver */}
                        <div>
                            <h2 className="text-xl font-bold mb-5">Receiver Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label>Receiver Name</label>
                                    <input
                                        type="text"
                                        placeholder="Receiver Name"
                                        {...register("receiverName", {
                                            required: "Receiver Name is required",
                                        })}
                                        className="input input-bordered w-full mt-1"
                                    />
                                    <p className="text-red-500 text-sm">
                                        {errors.receiverName?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Receiver Address</label>
                                    <input
                                        type="text"
                                        placeholder="Receiver Address"
                                        {...register("receiverAddress", {
                                            required: "Receiver Address is required",
                                        })}
                                        className="input input-bordered w-full mt-1"
                                    />
                                    <p className="text-red-500 text-sm">
                                        {errors.receiverAddress?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Receiver Contact No</label>
                                    <input
                                        type="text"
                                        placeholder="Receiver Contact No"
                                        {...register("receiverPhone", {
                                            required: "Receiver Phone is required",
                                        })}
                                        className="input input-bordered w-full mt-1"
                                    />
                                    <p className="text-red-500 text-sm">
                                        {errors.receiverPhone?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Receiver Region</label>
                                    <select
                                        {...register("receiverRegion", {
                                            required: "Select receiver district",
                                        })}
                                        className="select select-bordered w-full mt-1"
                                    >
                                        <option value="">Select Region</option>
                                        {regions.map((region, idx) => (
                                            <option key={idx} value={region}>
                                                {region}
                                            </option>
                                        ))}

                                    </select>
                                    <p className="text-red-500 text-sm">
                                        {errors.receiverRegion?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Receiver Districts</label>
                                    <select
                                        {...register("receiverDistrict", {
                                            required: "Select receiver district",
                                        })}
                                        className="select select-bordered w-full mt-1"
                                        disabled={!receiverRegion}
                                    >
                                        <option value="">Select Districts</option>
                                        {receiverDistricts.map((district, idx) => (
                                            <option key={idx} value={district}>
                                                {district}
                                            </option>
                                        ))}

                                    </select>
                                    <p className="text-red-500 text-sm">
                                        {errors.receiverRegion?.message}
                                    </p>
                                </div>

                                <div>
                                    <label>Delivery Instruction</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Delivery Instruction"
                                        {...register("deliveryInstruction")}
                                        className="textarea textarea-bordered w-full mt-1"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8">
                    <label className="flex items-center gap-2 mb-5">
                        <input
                            type="checkbox"
                            {...register("pickupTime")}
                            className="checkbox checkbox-success"
                        />
                        <span>Pickup Time 4pm - 7pm Approx.</span>
                    </label>

                    <button
                        type="submit"
                        className="btn bg-lime-400 hover:bg-lime-500 text-black border-none px-8"
                    >
                        Proceed to Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;