import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const signupSchema = z.object({
    fullName: z
        .string()
        .min(6, { message: 'Full name must be at least 6 characters' })
        .max(30, { message: 'Full name must be less then 30 characters' })
        .regex(/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]+$/, {
            message: 'Full name must contain only letters and spaces',
        }),
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(15, { message: 'Username must be less then 15 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(30, { message: 'Password must be less then 30 characters' }),
});

type FormFields = z.infer<typeof signupSchema>;

function Signup() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: '',
            username: '',
            email: '',
            password: '',
        },
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (formData: FormFields) => {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Signup failed');

            return data;
        },
        onSuccess: () => {
            toast.success('Account created successfully');
            navigate({ to: '/' });
        },
        onError: (error) => {
            toast.error(error.message || 'Something went wrong');
        },
    });

    const onSubmit = (data: FormFields) => {
        mutate(data);
    };

    return (
        <main className='flex gap-20 justify-center items-center h-screen'>
            <div>
                <img className='rounded-lg w-40' src='/logo.webp' alt='logo' />
            </div>
            <div className='space-y-4'>
                <Card className='w-80'>
                    <CardHeader>
                        <CardTitle className='text-center'>
                            Sign up to view photos from your friends.
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                            <Input {...register('fullName')} type='text' placeholder='full name' />
                            {errors.fullName && (
                                <p className='text-red-500 text-sm text-center'>
                                    {errors.fullName.message}
                                </p>
                            )}
                            <Input {...register('username')} type='text' placeholder='username' />
                            {errors.username && (
                                <p className='text-red-500 text-sm text-center'>
                                    {errors.username.message}
                                </p>
                            )}
                            <Input {...register('email')} type='text' placeholder='email' />
                            {errors.email && (
                                <p className='text-red-500 text-sm text-center'>
                                    {errors.email.message}
                                </p>
                            )}
                            <Input
                                {...register('password')}
                                type='password'
                                placeholder='password'
                            />
                            {errors.password && (
                                <p className='text-red-500 text-sm text-center'>
                                    {errors.password.message}
                                </p>
                            )}
                            <Button type='submit' size='fullWidth' disabled={isPending}>
                                {isPending ? '...' : 'Register'}
                            </Button>
                            {isError && (
                                <p className='text-red-500 text-sm text-center'>{error.message}</p>
                            )}
                        </form>
                    </CardContent>
                </Card>
                <Card className='w-80'>
                    <CardHeader>
                        <p>
                            Already have an account?{' '}
                            <Link to='/login'>
                                <span className='text-blue-400 font-bold'>Login</span>
                            </Link>
                        </p>
                    </CardHeader>
                </Card>
            </div>
        </main>
    );
}

export default Signup;
