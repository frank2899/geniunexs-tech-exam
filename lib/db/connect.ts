import mongoose from 'mongoose'

const connection: { isConnected?: any } = {}

export const connectToDataBase = async () => {
    try {
        if (connection.isConnected) return console.log('Connection already established')

        // MongoDB URI is hardcoded here for demonstration purposes;
        // it is not set using an environment variable
        const db = await mongoose.connect(
            'mongodb+srv://aughusf089:aughusf089@cluster0.dd5eg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' as string,
        )
        console.log('Connected to DB')

        connection.isConnected = db?.connections[0].readyState
        return mongoose.connection
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
    }
}
