import React from 'react';

import { ModalHeader } from 'reactstrap';

const CustomHeader = ({ toggle, method }) => (
  <ModalHeader toggle={toggle}>
    {method === 'add' ? 'Новое напоминание' : 'Изменить напоминание'}
  </ModalHeader>
);

export default CustomHeader;