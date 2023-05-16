import chalk from 'chalk';

type ErrorMessageParams = {
  text?: string,
  error: unknown,
};

type SuccessMessageParams = {
  text: string,
  replacer?: string,
  icon?: string,
};

export const showError = ({text, error}: ErrorMessageParams) => {
  console.log(`
  ${chalk.red.bold('!')} ${text ?? 'Ошибка'}
      «${chalk.italic(error instanceof Error ? error.message : 'Неизвестная ошибка')}»
  `);
};

export const showSuccess = ({text, replacer, icon}: SuccessMessageParams) => {
  console.log(`
  ${chalk.green.bold(`${ icon || '✔' }`)} ${replacer ? text.replace('%%', chalk.hex('#318495').bold(replacer)) : text}
  `);
};
