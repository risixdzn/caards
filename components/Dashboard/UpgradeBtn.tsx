import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function UpgradeBtn() {
    return (
        <Button className='rounded-full'>
            <Sparkles className='mr-2 w-5 h-5' />
            Upgrade to pro
        </Button>
    );
}
