const {
  collectDeepNodes,
  insertStarImport,
  makeTransform,
  ReplaceNodeOperation
} = require('@ngtools/webpack/src/transformers')
const { forwardSlashPath } = require('@ngtools/webpack/src/utils')
const { dirname, relative } = require('path')
const ts = require('typescript')

module.exports = function replaceBootstrap(
  getEntryModule,
  getTypeChecker,
  useFactories = true
) {
  const standardTransform = function(sourceFile) {
    const ops = []
    const entryModule = getEntryModule()
    const entryModuleIdentifiers = collectDeepNodes(
      sourceFile, ts.SyntaxKind.Identifier
    ).filter(identifier => identifier.text === entryModule.className)

    if (entryModuleIdentifiers.length === 0) {
      return []
    }

    // Find the bootstrap calls.
    entryModuleIdentifiers.forEach(entryModuleIdentifier => {
      // Figure out if it's a `platformTitaniumDynamic().bootstrapModule(AppModule)` call.
      if (!(
        entryModuleIdentifier.parent
        && entryModuleIdentifier.parent.kind === ts.SyntaxKind.CallExpression
      )) {
        return
      }

      const callExpr = entryModuleIdentifier.parent
      if (callExpr.expression.kind !== ts.SyntaxKind.PropertyAccessExpression) {
        return
      }

      const propAccessExpr = callExpr.expression
      if (propAccessExpr.name.text !== 'bootstrapModule'
        || propAccessExpr.expression.kind !== ts.SyntaxKind.CallExpression)
      {
        return
      }

      const bootstrapModuleIdentifier = propAccessExpr.name
      const innerCallExpr = propAccessExpr.expression
      if (!(
        innerCallExpr.expression.kind === ts.SyntaxKind.Identifier
        && innerCallExpr.expression.text === 'platformTitaniumDynamic'
      )) {
        return;
      }

      const platformTitaniumDynamicIdentifier = innerCallExpr.expression
      const idPlatformTitanium = ts.createUniqueName('__TiNg_bootstrap_');
      const idNgFactory = ts.createUniqueName('__TiNg_bootstrap_');

      // Add the transform operations.
      const relativeEntryModulePath = relative(dirname(sourceFile.fileName), entryModule.path);
      let className = entryModule.className;
      let modulePath = forwardSlashPath(`./${relativeEntryModulePath}`);
      let bootstrapIdentifier = 'bootstrapModule';

      if (useFactories) {
        className += 'NgFactory';
        modulePath += '.ngfactory';
        bootstrapIdentifier = 'bootstrapModuleFactory';
      }

      ops.push(
        // Replace the entry module import.
        ...insertStarImport(sourceFile, idNgFactory, modulePath),
        new ReplaceNodeOperation(sourceFile, entryModuleIdentifier,
          ts.createPropertyAccess(idNgFactory, ts.createIdentifier(className))),
        // Replace the platformTitaniumDynamic import.
        ...insertStarImport(sourceFile, idPlatformTitanium, 'titanium-angular'),
        new ReplaceNodeOperation(sourceFile, platformTitaniumDynamicIdentifier,
          ts.createPropertyAccess(idPlatformTitanium, 'platformTitanium')),
        new ReplaceNodeOperation(sourceFile, bootstrapModuleIdentifier,
          ts.createIdentifier(bootstrapIdentifier)),
      );
    })

    return ops
  }

  return makeTransform(standardTransform, getTypeChecker)
}
