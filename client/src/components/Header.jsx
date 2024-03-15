import {Link, useLocation} from 'react-router-dom'
import { Button, Navbar, TextInput} from "flowbite-react"
import {AiOutlineSearch} from "react-icons/ai";
import { FaMoon } from "react-icons/fa";


function Header() {
    const path = useLocation().pathname
    
  return (
    <Navbar className="border-b-2">
        {/* Logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg text-white">
          Habesha&apos;s
        </span>
        Blog
      </Link>

      {/* search input  */}
      <form>
        <TextInput
          type="text"
          placeholder="search ..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
{/* search button displayed below the large screen size */}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
   {/* Dark and light mode && signIn buttons */}
      <div className="flex gap-2 md:order-2">
        <Button color="gray" className="w-12 h-10 hidden sm:inline" pill>
          <FaMoon />
        </Button>

        <Link to="/signin">
          <Button gradientDuoTone="tealToLime" outline>Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>

      

      {/* Navbar.Toggle is a component for the humberger menu and to toggle the navbar links when it is clicked*/}

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Project</Link>
        </Navbar.Link>

        {/* we use active to make the links active based on the current page url */}
        {/* we use as={"div"} in the navbar link since both navbar.Link and Link components are using anchor tag and anchor tag inside an anchor tag is not allowed */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header