export class HandlerFormError {
  static getErrorMsg(
    fieldName: string,
    validatorName: string,
    validatorValue?: any
  ) {
    const config = {
      required: `${fieldName} - Campo obrigatório`,
      min: `${fieldName} - Valor minimo aceito: ${validatorValue}`,
    };
    return (config as any)[validatorName];
  }
}
