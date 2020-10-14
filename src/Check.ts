export class Check {
  public static checkIsDefined(value: any, message:string): any {
      if(Check.isDefined(value) === false){
          throw new Error(message)
      }

      return value;
  }

  public static isDefined(value: any): boolean {
    return value !== undefined || value !== null
  }

  public static isNullOrWhitespace(value:string|null|undefined){
      return value === null || value === undefined || value.trim().length === 0
  }
}