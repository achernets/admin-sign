import React from 'react';
import CustomScrollbars from './CustomScrollbars';

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
    <CustomScrollbars {...props} forwardedRef={ref} />
));

export default CustomScrollbarsVirtualList;