type WithChildren<T> = T & {
  children?: WithChildren<T>[];
};

export const mapTree = <
  T extends {
    children?: T[];
    [key: string]: any;
  },
  RT extends object,
>(
  tree: T[] | undefined,
  callback: (node: T) => RT,
): WithChildren<RT>[] => {
  return (
    tree?.map((item) => {
      if (item.children) {
        return {
          ...callback(item),
          children: mapTree(item.children, callback),
        };
      }
      return callback(item);
    }) ?? []
  );
};
