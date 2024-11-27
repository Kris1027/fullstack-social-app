import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
    component: Login,
});

function Login() {
    return (
        <main className='flex gap-20 justify-center items-center h-screen'>
            <div>
                <img className='rounded-lg pb-4 w-40' src='/logo.webp' alt='logo' />
            </div>
            <div className='space-y-4'>
                <Card className='w-80'>
                    <CardHeader>
                        <CardTitle className='text-center'>Fullstack Social App</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className='space-y-4'>
                            <Input type='text' placeholder='username or email' />
                            <Input type='text' placeholder='password' />
                            <Input type='text' placeholder='confirm password' />
                            <Button type='submit' size='fullWidth'>
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <Card className='w-80'>
                    <CardHeader>
                        <p>
                            Don't have an account yet?{' '}
                            <Link to='/register'>
                                <span className='text-blue-400 font-bold'>Register</span>
                            </Link>
                        </p>
                    </CardHeader>
                </Card>
            </div>
        </main>
    );
}
