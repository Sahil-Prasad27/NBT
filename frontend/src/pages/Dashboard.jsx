import Navbar from '../components/Navbar';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-2">Welcome! Use the navigation bar to manage your site content.</p>
      </div>
    </div>
  );
}

export default Dashboard;
