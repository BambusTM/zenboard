import {Button} from "@/components/ui/button";
import Link from "next/link";

interface NavbarProps {
    email?: string
}

export function Navbar(props: Readonly<NavbarProps>) {
    return (
        <header className="w-full border-b">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                <Link href="/">
                    <span className="text-lg font-semibold">ZEN | BOARD</span>
                </Link>
                <div>
                    {props.email ? (
                        <Link href="/profile">
                            <span className="text-muted-foreground">{props.email}</span>
                        </Link>
                    ) : (
                        <Link href="/auth">
                            <Button variant="outline">Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
