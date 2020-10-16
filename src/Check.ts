const isDefined = (value: any): boolean => {
  return value !== undefined && value !== null
}

const checkIsDefined = (value: any, message: string): any  => {
  if (isDefined(value) === false) {
    throw new Error(message)
  }

  return value;
}

const isNullOrWhitespace = (value: string | null | undefined) => {
  return value === null || value === undefined || value.trim().length === 0
}

export {
  isDefined,
  checkIsDefined,
  isNullOrWhitespace
}