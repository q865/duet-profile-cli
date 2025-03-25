import fs from "fs/promises";
import path from "path";
import ejs from "ejs";
import chalk from "chalk";

const TEMPLATES_DIR = path.join(process.cwd(), "src", "templates");

export async function generateProfile(data) {
  const profileDir = path.join(process.cwd(), "duet-profile");

  try {
    await fs.mkdir(profileDir, { recursive: true });

    // Генерация README
    const readmeTemplate = await fs.readFile(
      path.join(TEMPLATES_DIR, "readme-template.ejs"),
      "utf-8",
    );
    const readmeContent = ejs.render(readmeTemplate, data);

    await fs.writeFile(path.join(profileDir, "README.md"), readmeContent);

    // Генерация JSON-профиля
    await fs.writeFile(
      path.join(profileDir, "profile.json"),
      JSON.stringify(data, null, 2),
    );

    console.log(chalk.green(`\n📁 Профиль сохранен в: ${profileDir}`));
  } catch (err) {
    console.error(chalk.red("Ошибка генерации:"), err);
    throw err;
  }
}
