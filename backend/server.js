import { app } from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, async () => {
            console.log('Server running on port http://localhost:' + PORT);
        });
    } catch (error) {
        console.error('Server startup error: ' + error.message);
        process.exit(1);
    }
};

export default startServer;
