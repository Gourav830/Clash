import { Server } from "socket.io";
import { votingQueue, votingQueueName } from "./jobs/votingJobs.js";
import { commentQueue, commentQueueName } from "./jobs/commentjob.js";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      // User disconnected
    });
    socket.onAny(async (eventName: string, data: VotingData | CommentData) => {
      if (eventName.startsWith("clashing-")) {
        const votingData = data as VotingData;
        await votingQueue.add(votingQueueName, votingData);
        socket.broadcast.emit(`clashing-${votingData?.clashId}`, votingData);
      } else if (eventName.startsWith("clashing_comment-")) {
        const commentData = data as CommentData;
        await commentQueue.add(commentQueueName, commentData);
        socket.broadcast.emit(
          `clashing_comment-${commentData?.id}`,
          commentData
        );
      }
    });
  });
}
