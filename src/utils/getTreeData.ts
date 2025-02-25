export const getTreeData = (data: any[], isSelect?: boolean) => {
  const values: any = [];
  const items: any[] = data.filter((item) => !item.parentId);
  const newItems = items.map((item) =>
    isSelect
      ? {
          label: item.title,
          value: item._id,
          key: item._id,
        }
      : { ...item, key: item._id }
  );

  newItems.forEach((item) => {
    const children = getChildren(
      data,
      isSelect ? item.value : item._id,
      isSelect ?? false
    );

    values.push({
      ...item,
      children,
    });
  });

  return values;
};

const getChildren = (data: any[], key: string, isSelect: boolean) => {
  const items: any = [];
  const datas = data.filter((item) => item.parentId === key);

  datas.forEach((item) => {
    items.push(
      isSelect
        ? {
            label: item.title,
            value: item._id,
            children: getChildren(data, item._id, isSelect),
          }
        : {
            ...item,
            key: item._id,
            children: getChildren(data, item._id, isSelect),
          }
    );
  });

  return items;
};
