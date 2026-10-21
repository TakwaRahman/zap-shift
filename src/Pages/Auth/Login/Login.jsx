import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocailLogin from "../SocialLogin/SocailLogin";

const Login = () => {
    const { signInUser, forgotPass } = useAuth();
    const [loginError, setLoginError] = useState("");

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const handleForgotPassword = () => {
        const email = getValues("email");

        if (!email) {
            setLoginError("Please enter your email first.");
            return;
        }

        forgotPass(email)
            .then(() => {
                setLoginError("");
                alert("Password reset email sent.");
            })
            .catch((error) => {
                setLoginError(getErrorMessage(error.code));
            });
    };

    const getErrorMessage = (code) => {
        switch (code) {
            case "auth/invalid-credential":
            case "auth/wrong-password":
            case "auth/user-not-found":
                return "Email or password is incorrect.";
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/user-disabled":
                return "This account has been disabled.";
            case "auth/too-many-requests":
                return "Too many attempts. Please try again later.";
            case "auth/network-request-failed":
                return "Network error. Check your internet connection.";
            default:
                return "Login failed. Please try again.";
        }
    };

    const handleLogin = (data) => {
        setLoginError("");

        signInUser(data.email, data.pass)
            .then(() => {
                navigate(location?.state || "/");
            })
            .catch((error) => {
                console.log(error.code);
                setLoginError(getErrorMessage(error.code));
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome Back</h3>
            <p>Please login</p>

            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}

                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register("pass", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="input"
                        placeholder="Password"
                    />
                    {errors.pass && (
                        <p className="text-red-500">{errors.pass.message}</p>
                    )}

                    {loginError && (
                        <p className="text-red-500 text-sm mt-2">{loginError}</p>
                    )}

                    <div>
                        <a className="link link-hover" onClick={handleForgotPassword}>
                            Forgot password?
                        </a>
                    </div>

                    <button className="btn btn-neutral mt-4">Login</button>

                    <p>
                        New to zap shift{" "}
                        <Link state={location.state} className="text-blue-400" to="/register">
                            Register
                        </Link>
                    </p>
                </fieldset>
            </form>

            <SocailLogin />
        </div>
    );
};

export default Login;