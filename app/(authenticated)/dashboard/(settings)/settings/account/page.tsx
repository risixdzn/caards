import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteAccount from "@/components/Auth/DeleteAccount";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, User } from "lucide-react";
import { notFound } from "next/navigation";

import EditDisplayName from "@/components/Dashboard/Account/EditDisplayName";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/Dashboard/Typography";

const UserInfo = ({
    user,
}: {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        id: string;
        image?: string | null | undefined;
    };
}) => {
    return (
        <div id='userinfo' className='flex gap-6'>
            <Avatar className='lg:w-40 w-24 lg:h-40 h-24'>
                <AvatarImage src={user?.image as string} />
                <AvatarFallback className='text-5xl font-semibold text-muted-foreground'>
                    {user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className='h-24 lg:h-40 flex flex-col justify-center space-y-1'>
                <h2 className='text-2xl font-semibold'>{user?.name}</h2>
                <p className='text-sm text-muted-foreground'>{user?.email}</p>
                <p className='tracking-tight'>
                    Basic plan -{" "}
                    <b className='hover:underline'>
                        Turn pro
                        <ExternalLink className='h-4 w-4 ml-2 inline-block -translate-y-1 -translate-x-1' />
                    </b>
                </p>
                <Badge variant={"outline"} className='hidden lg:block text-muted-foreground'>
                    ID: {user?.id}
                </Badge>
            </div>
        </div>
    );
};

export default async function Account() {
    const user = await getUserSession();

    if (!user) {
        return notFound();
    }

    return (
        <div className='space-y-6'>
            <Heading>Account Settings</Heading>
            <UserInfo user={user} />
            <Card id='displayname' className='p-8 bg-background shadow-none relative'>
                <CardTitle className='font-heading tracking-wide'>Display name</CardTitle>
                <CardDescription className='my-3'>
                    Please enter your full name, or a display name you are comfortable with.
                </CardDescription>
                <CardContent className='p-0'>
                    <EditDisplayName display_name={user?.name} />
                </CardContent>
            </Card>

            <Card id='email' className='p-8 bg-background shadow-none relative'>
                <CardTitle className='font-heading tracking-wide'>Email</CardTitle>
                <CardDescription className='my-3'>
                    This is the email you can use to sign in.
                </CardDescription>
                <CardContent className='p-0'>
                    <Input className='w-full lg:w-72' disabled placeholder={user.email as string} />
                </CardContent>
            </Card>

            <Card
                id='delete'
                className='relative p-8 bg-background shadow-none border-destructive '
            >
                <CardTitle className='font-heading tracking-wide'>Delete Account</CardTitle>
                <CardDescription className='my-3'></CardDescription>
                <CardContent className='p-0 flex justify-between gap-10 mb-16'>
                    <p>
                        Permanently remove your Personal Account and all of its contents from the
                        Caards platform. This action is not reversible, so please continue with
                        caution.
                    </p>
                </CardContent>
                <CardFooter className='absolute w-full bg-destructive/50 rounded-b-lg -translate-x-8 -translate-y-10 flex justify-end py-4 '>
                    <DeleteAccount />
                </CardFooter>
            </Card>
        </div>
    );
}
