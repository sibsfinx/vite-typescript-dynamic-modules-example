export async function loadModule(moduleName: string, container: HTMLElement) {
    container.innerHTML = 'Loading module...'
    try {
      const module = await import(`../modules/${moduleName}Module.ts`)
      container.innerHTML = ''
      module.default(container)
    } catch (error) {
      container.innerHTML = `Error loading module: ${error}`
    }
  }