export enum EnumTypeof {
  string = '[object String]',
  number = '[object Number]',
  boolean = '[object Boolean]',
  array = '[object Array]',
  object = '[object Object]',
  function = '[object Function],[object AsyncFunction],[object GeneratorFunction],[object AsyncGeneratorFunction]',
  null = '[object Null]',
  undefined = '[object Undefined]',
  regexp = '[object RegExp]',
  set = '[object Set]',
  map = '[object Map]',
  file = '[object File]',
  date = '[object Date]'
}

export enum EnumContentType {
  json = 'application/json',
  formData = 'multipart/form-data'
}
