import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const Scrollbar = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Scrollbars ref={ref} autoHide {...props}>
      {children}
    </Scrollbars>
  );
});

export default Scrollbar;
