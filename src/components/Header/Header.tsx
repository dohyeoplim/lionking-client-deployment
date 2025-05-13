import Navigation from "./Navigation/Navigation";
import Actions from "./Actions";
import Logo from "./Logo/Logo";

type HeaderProps = {
    isLoggedIn?: boolean;
};

export default function Header({ isLoggedIn = false }: HeaderProps) {
    return (
        <header className="w-full flex justify-center py-6" role="banner" aria-label="Header">
            <div className="flex w-full items-center justify-between">
                <Logo />

                <div className="flex items-center gap-12.5">
                    <Navigation />
                    <Actions isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </header>
    );
}
