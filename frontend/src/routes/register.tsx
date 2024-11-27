import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/register')({
    component: Register,
});

function Register() {
    return (
        <main className='flex gap-20 justify-center items-center h-screen'>
            <div>
                <img className='rounded-lg pb-4 w-40' src='/logo.webp' alt='logo' />
            </div>
            <div className='space-y-4'>
                <Card className='w-80'>
                    <CardHeader>
                        <CardTitle className='text-center'>
                            Sign up to view photos from your friends.
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className='space-y-4'>
                            <Input type='text' placeholder='full name' />
                            <Input type='text' placeholder='username' />
                            <Input type='text' placeholder='email' />
                            <Input type='text' placeholder='password' />
                            <Button type='submit' size='fullWidth'>
                                Register
                            </Button>
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
