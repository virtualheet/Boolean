// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

// Define types for menu items
interface MenuItem {
  label: string;
  href: string;
  description?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const Footer: React.FC = () => {
  // Categories section
  const categories: MenuItem[] = [
    { label: 'Graphics & Design', href: '#' },
    { label: 'Digital Marketing', href: '#' },
    { label: 'Writing & Translation', href: '#' },
    { label: 'Video & Animation', href: '#' },
    { label: 'Music & Audio', href: '#' },
    { label: 'Programming & Tech', href: '#' },
    { label: 'AI Services', href: '#' },
    { label: 'Consulting', href: '#' },
    { label: 'Data', href: '#' },
    { label: 'Business', href: '#' },
    { label: 'Personal Growth & Hobbies', href: '#' },
    { label: 'Photography', href: '#' },
    { label: 'Finance', href: '#' },
    { label: 'End-to-End Projects', href: '#' },
    { label: 'Service Catalog', href: '#' },
  ];

  // For Clients section
  const forClients: MenuItem[] = [
    { label: 'How Fiverr Works', href: '#' },
    { label: 'Customer Success Stories', href: '#' },
    { label: 'Trust & Safety', href: '#' },
    { label: 'Quality Guide', href: '#' },
    { label: 'Fiverr Learn', href: '#', description: 'Online Courses' },
    { label: 'Fiverr Guides', href: '#' },
    { label: 'Fiverr Answers', href: '#' },
  ];

  // For Freelancers section
  const forFreelancers: MenuItem[] = [
    { label: 'Become a Fiverr Freelancer', href: '#' },
    { label: 'Become an Agency', href: '#' },
    { label: 'Freelancer Equity Program', href: '#' },
    { label: 'Kickstart', href: '#' },
    { label: 'Community Hub', href: '#' },
    { label: 'Forum', href: '#' },
    { label: 'Events', href: '#' },
  ];

  // Business Solutions section
  const businessSolutions: MenuItem[] = [
    { label: 'Fiverr Pro', href: '#' },
    { label: 'Project Management Service', href: '#' },
    { label: 'ClearVoice', href: '#', description: 'Content Marketing' },
    { label: 'Working Not Working', href: '#', description: 'Creative Talent' },
    { label: 'AutoDS', href: '#', description: 'Dropshipping Tool' },
    { label: 'Fiverr Logo Maker', href: '#' },
    { label: 'Contact Sales', href: '#' },
    { label: 'Fiverr Go', href: '#' },
  ];

  // Company section
  const company: MenuItem[] = [
    { label: 'About Fiverr', href: '#' },
    { label: 'Help & Support', href: '#' },
    { label: 'Social Impact', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Do not sell or share my personal information', href: '#' },
    { label: 'Partnerships', href: '#' },
    { label: 'Creator Network', href: '#' },
    { label: 'Affiliates', href: '#' },
    { label: 'Invite a Friend', href: '#' },
    { label: 'Press & News', href: '#' },
    { label: 'Investor Relations', href: '#' },
  ];

  // Group all sections together
  const footerSections: MenuSection[] = [
    { title: 'Categories', items: categories },
    { title: 'For Clients', items: forClients },
    { title: 'For Freelancers', items: forFreelancers },
    { title: 'Business Solutions', items: businessSolutions },
    { title: 'Company', items: company },
  ];

  // Social media links
  const socialLinks = [
    { icon: 'instagram', href: '#' },
    { icon: 'twitter', href: '#' },
    { icon: 'linkedin', href: '#' },
    { icon: 'facebook', href: '#' },
    { icon: 'pinterest', href: '#' },
  ];

  return (
    <footer className="bg-white hidden dark:bg-black pt-12 pb-6 border-t border-black dark:border-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Render sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-black dark:text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white text-sm"
                    >
                      {item.label}
                    </Link>
                    {item.description && (
                      <p className="text-black/70 dark:text-white/70 text-xs mt-1">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Windows Activation */}
        <div className="flex justify-end mb-8">
          <div className="text-right">
            <p className="text-black/70 dark:text-white/70 text-sm">Activate Windows</p>
            <p className="text-black/70 dark:text-white/70 text-xs">
              Go to Settings to activate Windows
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black dark:border-white pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0 flex items-center">
            <span className="text-black dark:text-white text-2xl font-bold">Boolean</span>
          </div>

          {/* Social Media & Language/Currency */}
          <div className="flex items-center ">
            {/* Social Media Icons */}
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                  aria-label={`${social.icon} link`}
                >
                  {renderSocialIcon(social.icon)}
                </Link>
              ))}
            </div>

            {/* Language and Currency Selector */}
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                aria-label="Select language"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 
                       2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 
                       8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 
                       20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 
                       9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">English</span>
              </button>
              <button
                className="flex items-center text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                aria-label="Select currency"
              >
                <span className="text-sm">INR</span>
              </button>
              <button
                className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                aria-label="Additional options"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 
                       0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper function to render social icons
const renderSocialIcon = (icon: string) => {
  switch (icon) {
    case 'instagram':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 
                   1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 
                   4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 
                   2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 
                   2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 
                   4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247 
                   -1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 
                   0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 
                   4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636 
                   -.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0 
                   -2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 
                   4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 
                   1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 
                   1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207 
                   -1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 
                   1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 
                   3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 
                   1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882 
                   .3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 
                   2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8 
                   -.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344 
                   -1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058 
                   -3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748 
                   -1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344 
                   -1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 
                   110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 
                   100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 
                   110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 
                   11.675-11.675 0-.178 0-.355-.012-.53A8.348 
                   8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 
                   4.118 4.118 0 001.804-2.27 8.224 8.224 0 
                   01-2.605.996 4.107 4.107 0 00-6.993 3.743 
                   11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 
                   001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 
                   4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 
                   4.108 4.108 0 003.834 2.85A8.233 8.233 0 
                   010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 
                   5v14c0 2.761 2.239 5 5 5h14c2.762 
                   0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 
                   19h-3v-11h3v11zm-1.5-12.268c-.966 
                   0-1.75-.79-1.75-1.764s.784-1.764 
                   1.75-1.764 1.75.79 1.75 1.764-.783 
                   1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 
                   0v5.604h-3v-11h3v1.765c1.396-2.586 
                   7-2.777 7 2.476v6.759z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Footer;
