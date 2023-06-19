import { Layout } from "../components/Layout"
import { useAuth } from "../hooks/auth";

export const BookingEvents = () => {
    const { profile } = useAuth();
    return (
        <Layout>
        <div>
            <h1>Booking Events</h1>
            { profile && <p>Hi {profile?.name}</p>}
        </div>
        </Layout>
    )
}