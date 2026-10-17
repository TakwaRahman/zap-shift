import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocailLogin from "../SocialLogin/SocailLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { registerUser, updateUserProfile } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {

        console.log(data);
        // console.log(data)

        const profileImg = data.photo[0];

        registerUser(data.email, data.pass)
            .then(result => {
                console.log(result.user)

                navigate(location?.state || '/')

                const formData = new FormData()

                formData.append('image', profileImg)

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`


                axios.post(image_API_URL, formData).then(res => {
                    console.log('image uploaded', res.data)

                    const userInfo = {
                        email: data.email,
                        displayName: data.name,
                        photoURL: res.data.data.url
                    }


                    axiosSecure.post('/users', userInfo).then(res => {
                        if (res.data.insertedId) {
                            console.log('user created in the data')
                        }
                    })



                    const userProfile = {
                        displayName: data.name,
                        photoURL: res.data.data.url
                    }
                    updateUserProfile(userProfile).then(() => {
                        console.log('user profile updated')
                        navigate(location?.state || '/')
                    }).catch(err => console.log(err))
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('This email is already registered!');
                }
                else {
                    console.log(error.message);
                }
            })

    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form action="" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* name feild */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your name" />
                    {
                        errors.name?.type === 'required' && <p className="text-red-500">name is required.</p>
                    }


                    {/* photo image feild */}
                    <label className="label">Photo image</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your photo" />
                    {
                        errors.photo?.type === 'required' && <p className="text-red-500">Photo is required.</p>
                    }


                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-500">Email is required.</p>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('pass', { required: true, minLength: 6 })} className="input" placeholder="Password" />

                    {
                        errors.pass?.type === 'required' && <p className="text-red-500">Password is required.</p>
                    }
                    {
                        errors.pass?.type === 'minLength' && <p className="text-red-500">password length will 6 words</p>
                    }


                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                    <p> Already register account <Link state={location.state} to="/login" className="text-blue-500 underline">Login</Link></p>
                </fieldset>
            </form>
            <SocailLogin></SocailLogin>
        </div >
    );
};

export default Register;