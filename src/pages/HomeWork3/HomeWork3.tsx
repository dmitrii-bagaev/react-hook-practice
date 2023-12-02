import {useTable} from 'react-table';
import {data} from "./data";
import './styles.css'
import {useMemo, useState} from "react";
import {ISortUI, sortData} from "./utils";

const columns = [
  {
    Header: 'userId',
    accessor: 'userId',
    width: 100,
  },
  {
    Header: 'id',
    accessor: 'id',
    width: 100,
  },
  {
    Header: 'title',
    accessor: 'title',
    width: 600,
  },
]

export const HomeWork3 = () => {
  const [sort, setSort] = useState<ISortUI>({})

  const sortedData = useMemo(() => sortData(data, sort), [sort])

  const {getTableProps, headerGroups, getTableBodyProps, rows, prepareRow} = useTable({columns, data: sortedData})

  const handleOnClick = (field: string) => () => {
    let direction: string = 'asc'
    if (field === sort.field) {
      direction = sort.direction === '' ? 'asc' : sort.direction === 'asc' ? 'desc' : '';
    }
    setSort({field, direction})
  };

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(hg => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map(col => {
              return (
                <th
                  {...col.getHeaderProps()}
                  // @ts-ignore
                  onClick={handleOnClick(col.id)}
                  className={sort.field === col.id ? sort.direction : ''}>
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
