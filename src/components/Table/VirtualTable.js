import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { sumBy } from 'lodash';
import { Table } from 'antd';
import ResizeableTitle from './ResizeableTitle';
import CustomScrollbarsVirtualList from './CustomScrollbarsVirtualList';
import ReactDragListView from "react-drag-listview";
import {
  DragOutlined,
} from '@ant-design/icons';

const VirtualTable = (props) => {
  const { columns, scroll, className, updateColumns } = props;
  const [tableWidth, setTableWidth] = useState(0);
  // const widthColumnCount = columns.filter(({ width }) => !width).length;
  // const mergedColumns = columns.map(column => {
  //   if (column.width) {
  //     return column;
  //   }

  //   return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
  // });
  const gridRef = useRef();
  const outerRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: scrollLeft => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const getMergetColumns = () => {
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const summ = sumBy(columns.filter(({ width }) => width), 'width');
    const newColumns = [...columns];
    return newColumns.map(column => {
      if (column.width) {
        return column;
      }

      return { ...column, width: Math.floor(tableWidth - summ / widthColumnCount) };
    });
  }

  const [mergedColumns, setMergetColumns] = useState(getMergetColumns())

  const updateMergetColumns = () => {
    setMergetColumns(getMergetColumns());
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true
    });
  }

  useEffect(updateMergetColumns, [columns])

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false,
    });
  };

  useEffect(() => resetVirtualGrid, []);

  useEffect(updateMergetColumns, [tableWidth]);


  const columnsWidth = sumBy(columns.filter(({ width }) => width), 'width')

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    return (

      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={index => {
          const { width } = mergedColumns[index];
          if (columnsWidth <= tableWidth + scrollbarSize) {
            return width;
          }
          return index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 40}
        width={columnsWidth < tableWidth ? columnsWidth : tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
        outerElementType={CustomScrollbarsVirtualList}
        outerRef={outerRef}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  const onDragEnd = (fromIndex, toIndex) => {
    const columnsCopy = mergedColumns.slice();
    const item = columnsCopy.splice(fromIndex, 1)[0];
    columnsCopy.splice(toIndex, 0, item);
    setMergetColumns(columnsCopy);
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true
    });
  };

  //console.log(columnss)

  const handleResize = index => (e, { size }) => {
    // const nextColumns = [...mergedColumns];
    // nextColumns[index] = {
    //   ...nextColumns[index],
    //   width: size.width,
    // };
    // setMergetColumns([...nextColumns]);
    updateColumns(index, size.width);
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true
    });
  };


  console.log(columnsWidth, tableWidth)
  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <ReactDragListView.DragColumn
        onDragEnd={onDragEnd}
        nodeSelector="th"
        handleSelector="i"
      >
        {mergedColumns.length > 0 && <Table
          {...props}
          className={classNames(className, 'virtual-table')}
          columns={mergedColumns.map((col, index) => ({
            ...col,
            title: () => <>{col.title}<i><DragOutlined /></i></>,
            onHeaderCell: column => ({
              width: column.width,
              onResize: handleResize(index),
            }),
          }))}
          pagination={false}
          components={{
            body: renderVirtualList,
            header: {
              cell: ResizeableTitle,
            }
          }}
        />}
      </ReactDragListView.DragColumn>
    </ResizeObserver>
  );
}
export default VirtualTable;