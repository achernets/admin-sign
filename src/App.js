import React, { useState } from 'react';
import { Button } from 'antd';
import ATable from './components/Table';
import './App.css';



const data = [
  {
    title: '1 sa dhaskdkajsh dkjash dkjajd a dk',
    key: '1A',
    text: '1.1A',
    ellipsis: true
  }, {
    title: '2',
    key: '2B',
    text: '2.2B'
  },
  {
    title: '3',
    key: '3C',
    text: '3.3C'
  },
  {
    title: '4',
    key: '4C',
    text: '4.3C'
  },
  {
    title: '5',
    key: '5C',
    text: '5.3C'
  },
  {
    title: '6',
    key: '6C',
    text: '6.3C'
  },
  {
    title: '7',
    key: '7C',
    text: '7.3C'
  }
];

const col1 = [
  {
    title: 'A',
    dataIndex: 'key',
    //width: 150
  },
  {
    title: 'B',
    dataIndex: 'text',
    width: 950
  },
  {
    title: 'C',
    dataIndex: 'title',
    width: 150
  },
]

const col2 = [
  {
    title: <span></span>,
    dataIndex: 'key',
    width: 100
  },
  {
    title: 'B',
    dataIndex: 'text',
    width: 150
  }
]


const App = () => {
  const [columns, setColumns] = useState(col1);

  const change = () => {
    setColumns(columns.length === 3 ? col2 : col1)
  }

  const updateColumns = (index, width) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: width,
    };
    setColumns(nextColumns);
  }

  //const width = columns.filter(({ width }) => !width).length === 0 ? sumBy(columns, 'width') : '100%';
  console.log(columns)
  return (<div className="App" style={{ width: 500 }}>

    <ATable
      size={'small'}
      updateColumns={updateColumns}
      columns={columns.map(col => ({
        ...col,
        width: col.width ? col.width : 80
      }))}
      dataSource={data}
      scroll={{
        y: 100,
        x: 'max-content',
      }}
    />
    <Button onClick={change}>123</Button>
    {/* </div> */}
  </div>
  );
}

export default App;
