import { getAuthSession } from "@/lib/auth";
export default async function Account() {
    const session = await getAuthSession();
    return (
        <>
            <h1>Signed in as:</h1>
            <ul>
                <li>{session?.user.email}</li>
                <li>ID:{session?.user.id}</li>
                <li>Name{session?.user.name}</li>
            </ul>
        </>
    );
}
