// src/profile-generator.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function generateProfile(data) {
  const profileDir = path.join(process.cwd(), "duet-profile");

  try {
    await fs.mkdir(profileDir, { recursive: true });

    // Генерация README
    const template = await fs.readFile(
      path.join(__dirname, "../templates/readme-template.ejs"),
      "utf-8",
    );

    await fs.writeFile(
      path.join(profileDir, "README.md"),
      ejs.render(template, data),
    );

    // Сохранение JSON
    await fs.writeFile(
      path.join(profileDir, "profile.json"),
      JSON.stringify(data, null, 2),
    );
  } catch (err) {
    console.error(chalk.red("Ошибка генерации:"), err);
    throw err;
  }
}
