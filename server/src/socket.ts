import { Server } from "socket.io";
import { votingQueue, votingQueueName } from "./jobs/votingJobs.js";

export function setupSocket(io:Server) {
    io.on("connection", (socket) => {
    
        console.log("New connection", socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
    socket.onAny(async (eventName:string,data:any) => {
        console.log(eventName,data);
        if(eventName.startsWith("clashing-")){
            // console.log("The vote data is ",data);
            await votingQueue.add(votingQueueName,data);
            socket.broadcast.emit(`clashing-${data?.clashId}`,data);
        }
    })
        // socket.on("join", (data) => {
        //     console.log("Joining room", data);
        //     socket.join(data);
        // });
        // socket.on("leave", (data) => {
        //     console.log("Leaving room", data);
        //     socket.leave(data);
        // });
        // socket.on("message", (data) => {
        //     console.log("Message", data);
        //     io.to(data.room).emit("message", data);
        // });
    })
    
}