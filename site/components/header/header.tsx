import SearchMenu from "./search-bar";

export default function Header() {
  return(
    <header className="global-header">
      <a href="/">
        <span className="logo">
          gate<span className="brand">keep</span>
        </span>
      </a>
      
      <SearchMenu/>
    </header>
  );
}