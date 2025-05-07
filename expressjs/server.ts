import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', chatRoutes);

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
