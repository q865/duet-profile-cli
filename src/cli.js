#!/usr/bin/env node
import inquirer from "inquirer";
import { generateProfile } from "./profile-generator.js";
import chalk from "chalk";
import gradient from "gradient-string";
import figlet from "figlet";

export async function runCLI() {
  console.log(
    gradient.pastel(
      figlet.textSync("Duet Profile", { horizontalLayout: "full" }),
    ),
  );

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "📛 Ваше имя:",
      validate: (input) => !!input || "Обязательное поле!",
    },
    {
      type: "number",
      name: "age",
      message: "🎂 Ваш возраст:",
      validate: (input) => input > 0 || "Введите корректный возраст",
    },
    {
      type: "list",
      name: "level",
      message: "📊 Ваш уровень:",
      choices: ["Junior", "Middle", "Senior"],
    },
    {
      type: "checkbox",
      name: "stack",
      message: "🛠 Ваш стек технологий:",
      choices: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Styled Components",
        "Tailwind CSS",
      ],
    },
  ]);

  await generateProfile(answers);
  console.log(chalk.green.bold("\n✅ Профиль успешно создан!"));
  console.log(chalk.blue("📁 Файлы сохранены в папку: duet-profile/\n"));
}
