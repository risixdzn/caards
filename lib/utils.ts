import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const useUser = () => {
    const session = useSession();
    return session.data?.user;
};
