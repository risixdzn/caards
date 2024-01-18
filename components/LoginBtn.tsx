import { Button } from "./ui/button";
import Link from "next/link";
import { Session } from "next-auth";

export default function LoginBtn({ session }: { session: Session | null }) {
    const href = (): string => {
        if (!session) {
            return "/auth/signin";
        }
        return "/dashboard/account";
    };

    return (
        <Link href={href()}>
            <Button variant={"braincards"}>{session ? "Account" : "Sign In"}</Button>
        </Link>
    );
}
