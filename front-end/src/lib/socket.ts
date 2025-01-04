import {io} from "socket.io-client";
import ENV from "./env";
const socket = io(ENV.BACKEND_URL); 
export default socket;