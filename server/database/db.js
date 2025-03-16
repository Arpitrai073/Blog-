import mongoose from 'mongoose';



const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@blog.6ak1t.mongodb.net/?retryWrites=true&w=majority&appName=Blog`
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error: ', error.message)
    }
}
export default Connection;