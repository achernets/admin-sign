import React, { useEffect } from 'react';
import { Resizable } from 'react-resizable';

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;
  useEffect(() => {
    return () => console.log('unmount')
  }, [])
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      axis='x'
      minConstraints={[50, Infinity]}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizeableTitle;