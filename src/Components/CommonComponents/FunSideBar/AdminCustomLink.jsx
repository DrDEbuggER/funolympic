import { Link, useMatch, useResolvedPath } from "react-router-dom"

// activate the clicked side bar items
export const AdminCustomLink = ({to, children, ...props}) => {
    const resolvedPath = useResolvedPath(to)
    console.log("resolved", resolvedPath)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}