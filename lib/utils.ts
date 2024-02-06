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

export const ISOdateConverter = (ISOdate: string) => {
    const date = new Date(ISOdate);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${year}/${month}/${day} ${hours}:${minutes}`;
};
