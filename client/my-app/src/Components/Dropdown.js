import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function Dropdown(props) {

  const [selectedValue, setSelectedValue] = useState('Search by...');

  return (
    <div>
        <Form.Select aria-label="Default select example" value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
            <option value="Artists">Artists</option>
            <option value="Albums">Albums</option>
            <option value="Users">Users</option>
        </Form.Select>
        <p>{selectedValue}</p>
    </div>
  );
}

export default Dropdown;