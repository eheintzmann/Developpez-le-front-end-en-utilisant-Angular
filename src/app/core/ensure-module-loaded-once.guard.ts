export class EnsureModuleLoadedOnceGuard {

  constructor(module: any) {
    if (module) {
      throw new Error(`${module.constructor.name} has already been loaded. Import this module in the AppModule only.`);
    }
  }

}
