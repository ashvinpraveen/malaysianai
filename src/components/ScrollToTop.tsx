"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const ScrollToTop = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchKey = searchParams?.toString() ?? "";
    const [hash, setHash] = useState("");

    useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash);
        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        if (hash) {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }

        window.scrollTo(0, 0);
    }, [pathname, searchKey, hash]);

    return null;
};

export default ScrollToTop;
