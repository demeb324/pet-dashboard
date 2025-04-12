import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/">PetFinder Dashboard</Link>
        </h1>
        <nav>
          <Link to="/">Dashboard</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}