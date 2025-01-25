import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="text-white text-4xl font-bold flex justify-between p-8">
      <h1>TODOS</h1>
      <nav className="flex justify-between gap-6">
        {/* <NavLink to="/" end> */}
        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-red-500 underline underline-offset-10" : "";
          }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-red-500 underline underline-offset-10" : "";
          }}
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-red-500 underline underline-offset-10" : "";
          }}
          to="/about"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
