import { RouteObject } from 'react-router/dist/lib/context';

//https://stackoverflow.com/questions/71434311/create-nested-object-from-array-of-objects-based-on-path-property
export function convertPathToTreeView(pages: RouteObject[]): RouteObject {
  let tree: RouteObject = { path: 'rootOfTheTree', children: [] };
  pages
    // important to sort via path
    .sort((a, b) => {
      return a.path?.localeCompare(b.path ?? '') ?? 0;
    })
    .forEach((route) => {
      const fileNames = route.path?.replace(/^\//, '').split('/') ?? [];
      tree = convertFolderOrFileToTree(tree, fileNames, route);
    });
  return tree;
}

export function convertFolderOrFileToTree(
  currentTree: RouteObject,
  fileNames: string[],
  route: RouteObject
): RouteObject {
  if (!fileNames.length) {
    return currentTree;
  }
  if (currentTree.path === fileNames[0]) {
    return convertFolderOrFileToTree(currentTree, fileNames.slice(1), route);
  } else {
    const child = currentTree.children?.find((t) => t.path === fileNames[0]);
    if (child) {
      return {
        ...currentTree,
        children: [
          ...(currentTree.children?.filter((tree) => tree.path !== child.path) ?? []),
          convertFolderOrFileToTree(child, fileNames.slice(1), route),
        ],
      } as RouteObject;
    } else if (fileNames.length > 1) {
      const newTree: RouteObject = { path: fileNames[0] };
      return {
        ...currentTree,
        children: [...(currentTree.children ?? []), convertFolderOrFileToTree(newTree, fileNames.slice(1), route)],
      } as RouteObject;
    } else {
      const newTree: RouteObject = { path: fileNames[0], element: route.element, id: route.id };
      return { ...currentTree, children: [...(currentTree.children ?? []), newTree] } as RouteObject;
    }
  }
}
