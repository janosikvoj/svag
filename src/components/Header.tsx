import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  return (
    <header className="fixed top-0 w-full flex justify-end p-3">
      <ThemeSwitch />
    </header>
  );
};

export default Header;
