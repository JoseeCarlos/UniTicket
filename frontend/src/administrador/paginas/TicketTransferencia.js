import React, { useState } from 'react';
const TicketTransferencia = () => {return("Ticket transferencia");}
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TicketTransferencia, comparisonFn);