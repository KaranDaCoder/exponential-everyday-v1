'use client';
import HabitDrawer from '@/components/HabitDrawer';
import { links } from '@/static_data/navLinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <div className='py-8 px-4 flex flex-col space-y-3 border-b shadow'>
      <HabitDrawer />
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`flex items-center gap-4 px-2 py-3 rounded-lg transition-all hover:bg-stone-100 group ${
            pathName === link.href.toLowerCase() ? 'bg-stone-300' : ''
          }`}
        >
          {link.icon}
          <p
            className={`hidden md:block font-medium text-stone-700 group-hover:text-stone-900 transition-colors `}
          >
            {link.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
