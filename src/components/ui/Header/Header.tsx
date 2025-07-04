"use client";

import { useState } from "react";
import Navigation from "./Navigation/Navigation";
import MobileNavigation from "./Mobile/MobileNavigation";
import Actions from "./Actions";
import TypeLogo from "../TypeLogo";
import HamburgerButton from "./Mobile/HamburgerButton";
import { useAuth } from "@/hooks/auth/useAuth";

export default function Header() {
    const { isAuthenticated, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header
                className="w-screen fixed flex justify-center items-center h-[60px] bg-gray-8 z-[10000]"
                role="banner"
                aria-label="Header"
            >
                <div className="flex w-full items-center justify-between px-6 max-w-[1100px]">
                    <TypeLogo heightPx={20} />

                    <div className="hidden lg:flex items-center gap-12.5">
                        <Navigation />
                        <Actions isLoggedIn={isAuthenticated} authenticatedUser={user} />
                    </div>

                    <div className="flex lg:hidden">
                        <HamburgerButton
                            isOpen={isMobileMenuOpen}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                            }}
                        />
                    </div>
                </div>
            </header>

            <MobileNavigation
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                isLoggedIn={isAuthenticated}
                authenticatedUser={user}
            />
        </>
    );
}
