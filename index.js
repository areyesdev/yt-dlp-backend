import express from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const AUDIO_FOLDER = "./audios";

if (!fs.existsSync(AUDIO_FOLDER)) {
  fs.mkdirSync(AUDIO_FOLDER);
}

app.post("/download", async (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).json({ error: "No URL provided" });

  const fileId = uuidv4();
  const filePath = path.join(AUDIO_FOLDER, `${fileId}.mp3`);

  exec(
    `yt-dlp -f bestaudio --extract-audio --audio-format mp3 -o "${filePath}" "${videoUrl}"`,
    (err) => {
      if (err) return res.status(500).json({ error: "Download failed", details: err.message });
      return res.json({ audioUrl: `${req.protocol}://${req.get("host")}/audio/${fileId}.mp3` });
    }
  );
});

app.use("/audio", express.static(path.join(AUDIO_FOLDER)));

app.listen(PORT, () => console.log(`🎧 Server running on port ${PORT}`));