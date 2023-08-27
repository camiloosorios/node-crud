import 'reflect-metadata'
import { config } from 'dotenv';
import Server from './server';

config();

const server = new Server;

server.start();