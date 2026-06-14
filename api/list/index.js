import fs from "fs";
import path from "path";

export default async function (req, res) {
    const root = process.cwd();

    const items = fs.readdirSync(root, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
        .filter(name => !name.startsWith("api"));

    res.json(items);
}

