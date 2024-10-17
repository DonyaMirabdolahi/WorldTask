import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await register(email, password);
            navigate('/boards');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-5"
                        >
                            {showPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />} 
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <a href="/" className="text-orange-500 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
