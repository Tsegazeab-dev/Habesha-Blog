# MERN BLOG App
## Setup frontend environment
   * Tailwind for vite := `https://tailwindcss.com/docs/guides/vite`
   * Before using Flowbite UI Library we should include some files into tailwind.config.css
   * Flowbite DOC := `https://www.flowbite-react.com/` 

## Header Component
 * `useLocation()` := hook we used to get the pathname of the current page.
 * ```
    const path = useLocation().pathname

    N.B:= useLocation is a hook imported from react router dom
   ```
 * we make the navbar link active if we  are on that page by comparing the pathname
 * e.g:= if we are on home page path="/" and the navbar link Home become active