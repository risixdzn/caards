import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Login } from "@/components/Auth/Login";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    // if the user is not logged in, show the login page, otherwise redirect to the account page
    if (!session) {
        return <Login />;
    } else {
        redirect("/dashboard/account");
    }
}
