import chalk from 'chalk';

type ErrorMessageParams = {
  text?: string,
  error: unknown,
  args?: unknown[],
};

type SuccessMessageParams = {
  text: string,
  replacer?: string,
  icon?: string,
  args?: unknown[],
  method?: 'log' | 'error' | 'warn' | 'info' | 'debug',
};

export const showError = ({text, error, args}: ErrorMessageParams) => {
  let errorMessage = 'Неизвестная ошибка';

  if (error instanceof Error) {
    errorMessage = error.message;

  } else if (args && args[0] && args[0] instanceof Error) {
    errorMessage = args[0].message;
  }

  console.log(`
  ${chalk.red.bold('!')} ${text ?? 'Ошибка'}
      «${chalk.italic(errorMessage)}»
  `);

  if (args && args.length) {
    console.error(...args);
  }
};

export const showInfo = ({text, replacer, icon, args, method}: SuccessMessageParams) => {
  console[method || 'log'](`
  ${chalk.green.bold(`${ icon || '✔' }`)} ${replacer ? text.replace('%%', chalk.hex('#318495').bold(replacer)) : text}
  `);

  if (args && args.length) {
    console[method || 'log'](...args);
  }
};
