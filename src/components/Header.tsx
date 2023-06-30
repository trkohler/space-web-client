import { useAuth } from "../hooks/auth";

export const Header = () => {
    const { onLogout } = useAuth();


    return (
        <header>
        <h1>Header</h1>
        <button
        onClick={(e) => {
            e.preventDefault();
            onLogout();
        }}
        >Logout</button>
        </header>
    );
    }
    