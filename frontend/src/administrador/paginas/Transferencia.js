import React, { useState } from 'react';
const Transferecia = () => {return("Transferecia");}
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Transferecia, comparisonFn);