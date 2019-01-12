import React from 'react';

import { ModalHeader } from 'reactstrap';

const CustomHeader = ({ toggle, method }) => (
  <ModalHeader toggle={toggle}>
    {method === 'add' ? 'Add New Reminder' : 'Update Reminder'}
  </ModalHeader>
);

export default CustomHeader;