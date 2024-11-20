import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendEmail } from "./config/mail.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Application = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, "views/emails/welcome.ejs"),
    { name: "singla" }
  );

  await emailQueue.add(emailQueueName, {
    to: "kidipa1018@exoular.com",
    subject: "Testing",
    body: html,
  });
  res.send("Hello World");
});

import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/emailJobs.js";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
