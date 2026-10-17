import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocailLogin from "../SocialLogin/SocailLogin";



const Login = () => {



    const { signInUser, forgotPass } = useAuth()

    const { register, handleSubmit, getValues, formState: { errors } } = useForm()

    // const location = useLocation();

    const location = useLocation();
    console.log(location)

    const navigate = useNavigate()

    const handleForgotPassword = () => {

        const email = getValues('email')

        console.log(email)

        if (!email) {
            alert("Please enter your email first.");
            return;
        }


        forgotPass(email)
            .then(() => {
                alert("Password reset email sent.");
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
            });
    }


    const handleLogin = (data) => {
        signInUser(data.email, data.pass).then(result => {
            console.log(result.user)
            navigate(location?.state || '/')
        })
            .catch(error => {
                console.log(error)
                console.log(error.message);
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome Back</h3>
            <p>Please login</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" {...register('pass', { required: true, minLength: 6 })} className="input" placeholder="Password" />

                    {
                        errors.pass?.type === 'minLength' && <p className="text-red-500">please pass length will 6</p>
                    }


                    <div><a className="link link-hover" onClick={handleForgotPassword}>Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>New to zap shift <Link state={location.state} className="text-blue-400" to='/register'>Register</Link></p>
                </fieldset>
            </form>
            <SocailLogin></SocailLogin>
        </div>
    );
};

export default Login;