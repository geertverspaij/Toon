import fs from "fs";
import path from "path";

export default async function (req, res) {
    const root = path.join(process.cwd(), "public"); // <-- jouw map

    const items = fs.readdirSync(root, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

    res.json(items);
}
