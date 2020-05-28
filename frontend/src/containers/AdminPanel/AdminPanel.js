import React, {Component} from 'react';

import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import AdvancedTable from "../../components/AdvancedTable/AdvancedTable";
import MasterTable from "../../components/MasterTable/MasterTable";
import SimpleTable from "../../components/SimpleTable/SimpleTable";

class AdminPanel extends Component {
  createData = (name, calories, fat) => {
    return { name, calories, fat};
  };

  render() {
    const rows = [
      this.createData('Cupcake', 305, 3.7),
      this.createData('Donut', 452, 25.0),
      this.createData('Eclair', 262, 16.0),
      this.createData('Frozen yoghurt', 159, 6.0),
      this.createData('Gingerbread', 356, 16.0),
      this.createData('Honeycomb', 408, 3.2),
      this.createData('Ice cream sandwich', 237, 9.0),
      this.createData('Jelly Bean', 375, 0.0),
      this.createData('KitKat', 518, 26.0),
      this.createData('Lollipop', 392, 0.2),
      this.createData('Marshmallow', 318, 0),
      this.createData('Nougat', 360, 19.0),
      this.createData('Oreo', 437, 18.0),
    ];

    const headCells = [
      { id: 'name', numeric: false, label: 'Dessert (100g serving)'},
      { id: 'calories', numeric: true, label: 'Calories'},
      { id: 'fat', numeric: true, label: 'Fat (g)'},
      { id: 'dummyCell1' },
      { id: 'addCell', isAddButton: true, path: '/categories/add' },
    ];

    return (
      <div>
        <MasterTable
          rows={rows}
          headCells={headCells}
        />
      </div>
    );
  }
}

export default AdminPanel;