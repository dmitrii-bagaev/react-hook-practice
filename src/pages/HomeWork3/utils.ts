export interface ISortUI {
  field?: string;
  direction?: string;
}

export const sortData = (data: any[], sort: ISortUI): any[] => {
  const {field, direction} = sort;

  if (!data.length) {
    return [];
  }

  let sortedData: any[] = [...data];

  if (!field || !direction) {
    return sortedData;
  } else {
    const sortType = typeof data[0][field]
    const getSortedDirection = (items: any[]) => (direction === 'asc' ? items : items.reverse());
    if (sortType === 'number') {
      const sortFn = (a: { [x: string]: any; }, b: { [x: string]: any; }) => Number(a[field]) - Number(b[field]);
      const newSortedData = sortedData.filter(o => !isNaN(Number(o[field]))).sort(sortFn);
      const filteredIsNaN = sortedData.filter(o => isNaN(Number(o[field])));
      sortedData = [...getSortedDirection(newSortedData), ...filteredIsNaN];
    } else if (sortType === 'boolean') {
      const newSortedData = sortedData.sort(o => (o[field] ? -1 : 1));
      sortedData = getSortedDirection(newSortedData);
    } else {
      const sortFn = (a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        if (a[field] > b[field]) {
          return 1
        }
        if (a[field] < b[field]) {
          return -1
        }
        return 0
      }
      const newSortedData = sortedData.sort(sortFn);
      sortedData = getSortedDirection(newSortedData);
    }
    return sortedData;
  }
};
