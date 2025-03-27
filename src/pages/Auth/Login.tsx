import { useEffect } from 'react';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { LoginData, loginSchema } from '../../validation/schemas';
import InputField from '../../shared/InputField';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import AuthStore from '../../store/AuthStore';
import { notifyDismiss, notifyLoading, notifySuccess } from '../../utils/notification';

function Login() {
    const navigate = useNavigate();
    const tokens = AuthStore.getTokens();

    useEffect(() => {
        if (tokens.accessToken) {
            navigate('/');
        }
    }, [tokens, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: joiResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        const loginId = notifyLoading("Logging in...");
        try {
            const { accessToken, refreshToken } = await AuthService.login(data);
            AuthStore.setTokens(accessToken, refreshToken);
            notifyDismiss(loginId);
            notifySuccess("Login successful!");
            navigate('/dashboard');
        } catch (error) {
            notifyDismiss(loginId);
            // console.error('Failed to login', error);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Please enter your details to sign in</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <InputField
                    label="Email or Login"
                    type="text"
                    register={register('loginOrEmail')}
                    icon={<Mail />}
                    placeholder='Enter your email or login'
                    error={errors.loginOrEmail?.message}
                />
                <InputField
                    label="Password"
                    type="password"
                    register={register('password')}
                    icon={<Lock />}
                    placeholder='Enter your password'
                    error={errors.password?.message}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                    <span>Sign in</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>
        </>
    );
}

export default Login;