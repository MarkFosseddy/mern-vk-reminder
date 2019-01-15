import React from 'react';

import { Button } from 'reactstrap';

const CustomButton = ({ method, block, onClick, color }) => (
  <Button
    block={block}
    color={color}
    onClick={onClick}
  >
    {method === 'add' ? 'Создать' : 'Изменить'}
  </Button>
);

export default CustomButton;