import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { RegisterData, registerSchema } from '../../validation/schemas';
import InputField from '../../shared/InputField';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notifyDismiss, notifyError, notifyLoading, notifySuccess } from '../../utils/notification';
import { ArrowRight, Mail, User, Lock } from 'lucide-react';

function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: joiResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        console.log(1);
        const registeredId = notifyLoading("Registering...");
        try {
            await AuthService.register(data);
            notifyDismiss(registeredId);
            notifySuccess("Registration successful! Please check your email for verification.");
            navigate('/auth');
        } catch (error) {
            notifyDismiss(registeredId);
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    notifyError(error.response.data.message);
                } else {
                    notifyError("An unexpected error occurred. Please try again.");
                }
            }
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create an account</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Fill in your details to get started</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    label="Full Name"
                    type="text"
                    register={register('full_name')}
                    icon={<User />}
                    placeholder='Enter your full name'
                    error={errors.full_name?.message}
                />
                <InputField
                    label="Full Name"
                    type="email"
                    register={register('email')}
                    icon={<Mail />}
                    placeholder='Enter your email'
                    error={errors.email?.message}
                />
                <InputField
                    label="Password"
                    type="password"
                    register={register('password')}
                    icon={<Lock />}
                    placeholder='Create a password'
                    error={errors.password?.message}
                />
                <InputField
                    label="Confirm Password"
                    type="password"
                    register={register('passwordConfirmation')}
                    icon={<Lock />}
                    placeholder='Confirm your password'
                    error={errors.passwordConfirmation?.message}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                    <span>Create account</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>
        </>
    );
}

export default Login;