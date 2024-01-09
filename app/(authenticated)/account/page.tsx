import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Account() {
    const session = await getAuthSession();
    return (
        <div>
            <h1>Signed in as:</h1>
            <ul>
                <li>{session?.user.email}</li>
                <li>ID:{session?.user.id}</li>
                <li>Name{session?.user.name}</li>
            </ul>
            <Link href='/api/auth/signout'>
                <Button>Sign Out</Button>
            </Link>
        </div>
    );
}
