import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { RegisterData, registerSchema } from '../../validation/schemas';
import InputField from '../../shared/InputField';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notifyDismiss, notifyError, notifyLoading, notifySuccess } from '../../utils/notification';
import { ArrowRight, Mail, User, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';
import { useTheme } from '../../context/ThemeContext';

interface Country {
    code: string;
    name: string;
    flag: string;
}

function Register() {
    const navigate = useNavigate()
    const [countries, setCountries] = useState<Country[]>([]);
    const { isDark } = useTheme();

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data: { cca2: string; name: { common: string }; flags: { png: string } }[]) => {
                const formattedCountries: Country[] = data.map((country) => ({
                    name: country.name.common,
                    code: country.cca2,
                    flag: country.flags.png,
                }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountries(formattedCountries);
            });
    }, []);

    const countryOptions = countries.map((country) => ({
        value: country.name,
        label: (
            <div className="flex items-center">
                <img src={country.flag} alt={country.name} className="w-5 h-3 mr-2" />
                {country.name}
            </div>
        ),
    }));

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<RegisterData>({
        resolver: joiResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        console.log(data);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-x-1 grid grid-cols-1 md:grid-cols-2 gap-2" noValidate>
                <div>
                    <InputField
                        label="Login"
                        type="text"
                        register={register('login')}
                        icon={<User />}
                        placeholder="Enter your login"
                        error={errors.login?.message}
                    />
                </div>
                <div>
                    <InputField
                        label="Full Name"
                        type="text"
                        register={register('full_name')}
                        icon={<User />}
                        placeholder="Enter your full name"
                        error={errors.full_name?.message}
                    />
                </div>
                <div className="col-span-2">
                    <InputField
                        label="Email"
                        type="email"
                        register={register('email')}
                        icon={<Mail />}
                        placeholder="Enter your email"
                        error={errors.email?.message}
                    />
                </div>
                <div>
                    <InputField
                        label="Password"
                        type="password"
                        register={register('password')}
                        icon={<Lock />}
                        placeholder="Create a password"
                        error={errors.password?.message}
                    />
                </div>
                <div>
                    <InputField
                        label="Confirm Password"
                        type="password"
                        register={register('passwordConfirmation')}
                        icon={<Lock />}
                        placeholder="Confirm your password"
                        error={errors.passwordConfirmation?.message}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Country</label>
                    <Controller
                        name="countryCode"
                        control={control}
                        render={({ field }) => (
                            <ReactSelect
                                options={countryOptions as unknown as { value: string; label: string }[]}
                                className='w-full border border-gray-300 dark:border-gray-600
                     rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white'
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        backgroundColor: isDark ? '#2d3748' : '#ffffff', // Dark: #2d3748, Light: #ffffff
                                        borderColor: isDark ? '#4a5568' : '#e2e8f0', // Dark: #4a5568, Light: #e2e8f0
                                        color: isDark ? '#ffffff' : '#000000', // Text color
                                        borderRadius: '8px',
                                        boxShadow: isDark ? '0 2px 4px rgba(255, 255, 255, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    }),
                                    option: (baseStyles, state) => ({
                                        ...baseStyles,
                                        backgroundColor: state.isSelected
                                            ? (isDark ? '#4a5568' : '#3182ce') // Selected: Dark: #4a5568, Light: #3182ce
                                            : state.isFocused
                                                ? (isDark ? 'black' : 'white') // Focused color
                                                : (isDark ? '#2d3748' : '#edf2f7'), // Default background color
                                        color: state.isSelected ? '#ffffff' : (isDark ? '#ffffff' : '#000000'), // Text color
                                        cursor: 'pointer',
                                    }),
                                    singleValue: (baseStyles) => ({
                                        ...baseStyles,
                                        color: isDark ? '#ffffff' : '#000000', // Text color for the selected value
                                    }),
                                }}
                                classNamePrefix="react-select"
                                onChange={(selectedOption: SingleValue<{ value: string; label: string }>) => {
                                    const selectedValue = selectedOption?.value;
                                    if (selectedValue) {
                                        const selectedCountry = countries.find(
                                            (country) => country.name === selectedValue
                                        );
                                        if (selectedCountry) {
                                            field.onChange(selectedCountry.code);
                                        }
                                    }
                                }}
                            />
                        )}
                    />
                    {errors.countryCode && <p className="p-2 rounded-lg flex items-center justify-center space-x-2 text-red-700 dark:text-red-200">{errors.countryCode.message}</p>}
                </div>
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                    >
                        <span>Create account</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </>
    );
}

export default Register;