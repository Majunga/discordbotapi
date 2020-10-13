export class Check {
  public static checkIsDefined(value: any, message:string): any {
      if(value === undefined || value === null){
          throw new Error(message)
      }

      return value;
  }

  public static isNullOrWhitespace(value:string|null|undefined){
      return value === null || value === undefined || value.trim().length === 0
  }
}