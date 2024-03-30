import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'


const Footer = () => {
    // find the current year
    const year = new Date().getFullYear()

    return (
        <footer className='border-t-2 text-center'>
            <div className="flex justify-around items-center py-4">
                <div>
                    <p className="text-sm font-semibold">© {year} Acme Auth</p>
                </div>
                <div>
                    <Link href="/about" className="text-sm font-semibold">
                        About
                    </Link>
                </div>
            </div>
            <ThemeToggle />
        </footer>
    )
}

export default Footer