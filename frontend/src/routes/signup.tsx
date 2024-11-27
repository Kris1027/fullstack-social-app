import Signup from '@/components/auth/signup';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
    component: Signup,
});

<Signup />;
