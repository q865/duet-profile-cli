import inquirer from "inquirer";
import { generateProfile } from "./profile-generator.js";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";

const QUESTIONS = [
  /* Полный список вопросов из предыдущего примера */
];

export async function runCLI() {
  console.log(
    gradient.rainbow(
      figlet.textSync("Duet  Profile", { horizontalLayout: "full" }),
    ),
  );

  const answers = await inquirer.prompt(QUESTIONS);
  await generateProfile(answers);

  console.log(chalk.green.bold("\n✅ Ваш цифровой профиль готов!"));
  console.log(chalk.blue("Теперь вы можете:"));
  console.log("- Добавить его в портфолио");
  console.log("- Поделиться с наставником");
  console.log("- Использовать для самоанализа\n");
}
