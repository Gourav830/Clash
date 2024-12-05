import { Server } from "socket.io";
import { votingQueue, votingQueueName } from "./jobs/votingJobs.js";
import { commentQueue, commentQueueName } from "./jobs/commentjob.js";

export function setupSocket(io:Server) {
    io.on("connection", (socket) => {
    
        console.log("New connection", socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
    socket.onAny(async (eventName:string,data:any) => {
        console.log(eventName,data);
        if(eventName.startsWith("clashing-")){
            console.log("The vote data is ",data);
            await votingQueue.add(votingQueueName,data);
            socket.broadcast.emit(`clashing-${data?.clashId}`, data);
        }else if(eventName.startsWith("clashing_comment-")){
            // console.log("The comment data is ",data);
            await commentQueue.add(commentQueueName,data);
            socket.broadcast.emit(`clashing_comment-${data?.id}`, data);
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