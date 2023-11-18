import Sequelize from 'sequelize';
import { environment } from './environment.js';


export const sequelize = new Sequelize(
    environment.DB.DB_NAME,
    environment.DB.DB_USER,
    environment.DB.DB_PASSWORD,
    {
        host: environment.DB.DB_HOST,
        dialect: environment.DB.DB_DIALECT,
        port: environment.DB.DB_PORT,
    }
);

export const connectDB = async () => {
    try {
        await sequelize.sync( { alter: true } );
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
};