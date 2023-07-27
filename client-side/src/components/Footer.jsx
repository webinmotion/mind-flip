export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    // tailwind class to add top border of red color 2px thick
    // <footer className=" border-red-500">

    <footer className="footer border-t-2 dark:border-primary-lightest bg-background-color dark:bg-darkest dark:text-light-text text-primary-darkest ">
      <div className="b container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="mb-4 w-full sm:mb-0 sm:w-auto">
            <p className="text-1.5xl">
              &copy; {year} Mind Flip. All rights reserved.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
