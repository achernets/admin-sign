import React, { useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbars = ({ onScroll, forwardedRef, style, children }) => {
  const refSetter = useCallback(
    scrollbarsRef => {
      if (scrollbarsRef) {
        forwardedRef(scrollbarsRef.view);
      } else {
        forwardedRef(null);
      }
    },
    [forwardedRef]
  );

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: "hidden" }}
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbars;