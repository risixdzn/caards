import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteAccount from "@/components/Auth/DeleteAccount";

export default async function Account() {
    const session = await getAuthSession();

    return (
        <div>
            <h1>Signed in as:</h1>
            <Avatar>
                <AvatarImage src={session?.user?.image as string} />
                <AvatarFallback>{session?.user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <ul>
                <li>Email: {session?.user?.email}</li>
                <li>ID: {session?.user?.id}</li>
                <li>Name: {session?.user?.name}</li>
            </ul>
            <DeleteAccount />

            <Link href='/auth/signout'>
                <Button>Sign Out</Button>
            </Link>
        </div>
    );
}
