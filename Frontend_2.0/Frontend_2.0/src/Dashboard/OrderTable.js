export default function OrderTable(props) {
  return (
    <div className="col-8">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Category</th>
            <th>Vendor</th>
            <th>Description</th>
            <th>Active Bids</th>
            <th>Time Remaining</th>
            <th>Order Status</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
