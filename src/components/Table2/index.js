import React, { useEffect, useRef } from 'react';
import { Table } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';


const CustomScrollbars = ({ children, tableRef, ...props }) => {
  // const refSetter = useCallback(
  //   scrollbarsRef => {
  //     if (scrollbarsRef) {
  //       forwardedRef(scrollbarsRef.view);
  //     } else {
  //       forwardedRef(null);
  //     }
  //   },
  //   [forwardedRef]
  // );
  //console.log(tableRef)
  return (
    <Scrollbars
      //ref={refSetter}
      style={{ height: 100, overflow: "hidden" }}
      onScroll={(s) => {
        console.log(s.target.scrollLeft)
        console.log(tableRef.current.getElementsByClassName('ant-table-header')[0].scrollLeft = s.target.scrollLeft)
      }}
    >
      <table {...props}>{children}</table>
    </Scrollbars>
  );
};

const ATable = (props) => {
  const tableRef = useRef(null);
  useEffect(() => {
    console.log(tableRef);
    console.log(tableRef.current.getElementsByClassName('ant-table-body')[0].style.overflow = 'hidden')
    return () => {

    };
  }, [tableRef])
  return (
    <div ref={tableRef}>
      <Table

        components={{
          table: (props) => <CustomScrollbars {...props} tableRef={tableRef} />
        }}
        {...props}
      />
    </div>
  );
};

export default ATable;

