import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const app = express();
const port = process.env.PORT || 4173;

app.use("/assets", express.static(path.join(root, "transfer", "assets")));
app.use("/transfer", express.static(path.join(root, "transfer")));
app.use(express.static(path.join(root, "dist")));

app.use((_req, res) => {
  res.sendFile(path.join(root, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`NeuroBodyWork site running at http://127.0.0.1:${port}`);
});
