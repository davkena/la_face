import Link from 'next/link';

const Header = () => (
  <header className="bg-gray-800 p-4 w-full flex justify-between items-center">
    <div className="text-white text-2xl font-bold">Learning Hub</div>
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/tests"
             className="text-white">Tests
          </Link>
        </li>
        <li>
          <Link href="/results"
             className="text-white">Results
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;