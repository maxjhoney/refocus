const ConnectedNamespaces = module.exports = {
  nspStrings: new Set(),

  addNamespace(nsp) {
    ConnectedNamespaces.nspStrings.add(nsp);
  },

  removeNamespace(nsp) {
    ConnectedNamespaces.nspStrings.delete(nsp);
  },
};
