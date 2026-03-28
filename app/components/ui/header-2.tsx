'use client';
import React from 'react';
import { Button, buttonVariants } from './button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from './menu-toggle-icon';
import { useScroll } from './use-scroll';

const NAV_LINKS = [
  { label: "Profiles", href: "#profiles" },
  { label: "Introduction", href: "#intro" },
  { label: "Experience", href: "#experience" },
  { label: "Photo Shoots", href: "#photoshoots" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);
    const [activeSection, setActiveSection] = React.useState<string>("");

    // Track which section is currently in view
    React.useEffect(() => {
        const sectionIds = NAV_LINKS.map(({ href }) => href.slice(1));
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                }
            },
            { rootMargin: "-30% 0px -70% 0px" }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
                {
                    'bg-surface-base/95 supports-[backdrop-filter]:bg-surface-base/50 border-white/10 backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow-lg':
                        scrolled && !open,
                    'bg-surface-base/90': open,
                },
            )}
        >
            <nav
                className={cn(
                    'flex h-14 w-full items-center justify-between px-6 md:h-12 md:transition-all md:ease-out',
                    {
                        'md:px-4': scrolled,
                    },
                )}
            >
                <a
                    href="#hero"
                    className="font-serif text-sm uppercase tracking-widest text-white transition-colors hover:text-accent-400"
                >
                    Anshul Chugh
                </a>
                <div className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            className={cn(
                                buttonVariants({ variant: 'ghost', size: 'sm' }),
                                'font-sans text-xs uppercase tracking-wider',
                                activeSection === link.href
                                    ? 'text-accent-400'
                                    : 'text-zinc-400',
                            )}
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                >
                    <MenuToggleIcon open={open} className="size-5" duration={300} />
                </Button>
            </nav>

            <div
                className={cn(
                    'bg-surface-base/95 backdrop-blur-xl fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y border-white/10 md:hidden',
                    open ? 'block' : 'hidden',
                )}
            >
                <div className="flex h-full w-full flex-col justify-between gap-y-2 p-6">
                    <div className="grid gap-y-2">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                className={cn(
                                    buttonVariants({
                                        variant: 'ghost',
                                        className:
                                            'justify-start font-sans text-base uppercase tracking-wider',
                                    }),
                                    activeSection === link.href
                                        ? 'text-accent-400'
                                        : 'text-zinc-300',
                                )}
                                href={link.href}
                                onClick={handleLinkClick}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
