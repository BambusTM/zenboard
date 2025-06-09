import {Button} from "@/components/ui/button";

interface NavbarProps {
    email?: string
}

export function Navbar(props: NavbarProps) {
    return (
        <header className="w-full border-b">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                <span className="text-lg font-semibold">ZEN | BOARD</span>
                <div>
                    {props.email ? (
                        <span className="text-muted-foreground">{props.email}</span>
                    ) : (
                        <Button variant="outline">Login</Button>
                    )}
                </div>
            </div>
        </header>
    )
}
