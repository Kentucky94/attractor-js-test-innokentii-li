import React, {Component} from 'react';

import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import AdvancedTable from "../../components/AdvancedTable/AdvancedTable";

class AdminPanel extends Component {
  render() {
    return (
      <div>
        Admin panel
        <AdvancedTable />
      </div>
    );
  }
}

export default AdminPanel;