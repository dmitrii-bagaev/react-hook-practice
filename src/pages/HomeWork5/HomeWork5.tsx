import {useTable} from "react-table";
import {getData, TData} from "./data";
import './styles.css'
import {useDeferredValue, useMemo, useState} from "react";

const columns = [
  {
    Header: 'id',
    accessor: 'id',
    width: 100,
  },
  {
    Header: 'value',
    accessor: 'value',
    width: 500,
  },
]

const useSortData = (data: any[], searchValue: string, field: string) =>
  useMemo(() => {
    console.log('useSortData')
    const strMatchLength = (str: string): number =>
      searchValue.split('').filter(char => str.includes(char)).length
    const sortFn = (word1: any, word2: any) => strMatchLength(word2[field]) - strMatchLength(word1[field])
    return [...data].sort(sortFn)
  }, [data, searchValue])

export const HomeWork5 = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const data: TData[] = useMemo(() => [...getData(10000, 5, 20)], [])
  const deferredSearchValue = useDeferredValue(searchValue)
  const sortedData = useSortData(data, deferredSearchValue, 'value')

  console.log('render')

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = useTable({columns, data: sortedData})

  const handleOnChange = (e: any) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="container5">
      <input value={searchValue} onChange={handleOnChange}/>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(hg => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map(col => {
              return (
                <th {...col.getHeaderProps()}>
                <span>
                  {col.render('Header')}
                </span>
                </th>
              )
            })}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} width={cell.column.width}>
                  <span>{cell.render('Cell')}</span>
                </td>
              ))}
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
};
