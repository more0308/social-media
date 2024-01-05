export function CallHttpMiddleware(HttpMiddleware: any, func: string): any {
  const inst = new HttpMiddleware();
  return inst[func].bind(inst);
}
