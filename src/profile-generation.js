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

    // 1. Генерация README.md из шаблона
    const template = await fs.readFile(
      path.join(__dirname, "../templates/readme-template.ejs"),
      "utf-8",
    );
    const readmeContent = ejs.render(template, data);

    // 2. Сохранение JSON-профиля
    await fs.writeFile(
      path.join(profileDir, "profile.json"),
      JSON.stringify(data, null, 2),
    );

    // 3. Сохранение README.md
    await fs.writeFile(path.join(profileDir, "README.md"), readmeContent);
  } catch (err) {
    console.error(chalk.red("Ошибка генерации:"), err);
    throw err;
  }
}
