import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#193b97] text-white p-4 flex gap-4 text-1xl font-bold">
      <Link to="/">Home</Link>
      <Link to="/todo">ToDo-list</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to="/finance">Finance</Link>
    </nav>
  );
}