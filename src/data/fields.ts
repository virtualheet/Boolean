// Complete Fiverr service categories data structure
const fiverrCategories = [
    {
      category: "Graphics & Design",
      subcategories: [
        {
          name: "Logo & Brand Identity",
          fields: [
            "Logo Design",
            "Brand Style Guides",
            "Business Cards & Stationery",
            "Fonts & Typography",
            "Logo Maker Tool"
          ],
          hasSpecialLink: true,
          specialLinkName: "Logo Maker Tool",
          specialLinkIcon: "↗"
        },
        {
          name: "Art & Illustration",
          fields: [
            "Illustration",
            "AI Artists",
            "AI Avatar Design",
            "Children's Book Illustration",
            "Portraits & Caricatures",
            "Cartoons & Comics",
            "Pattern Design",
            "Tattoo Design",
            "Storyboards",
            "NFT Art"
          ],
          newTags: ["AI Avatar Design"]
        },
        {
          name: "Web & App Design",
          fields: [
            "Website Design",
            "App Design",
            "UX Design",
            "Landing Page Design",
            "Icon Design"
          ]
        },
        {
          name: "Product & Gaming",
          fields: [
            "Industrial & Product Design",
            "Character Modeling",
            "Game Art",
            "Graphics for Streamers"
          ]
        },
        {
          name: "Print Design",
          fields: [
            "Flyer Design",
            "Brochure Design",
            "Poster Design",
            "Catalog Design",
            "Menu Design"
          ]
        },
        {
          name: "Visual Design",
          fields: [
            "Image Editing",
            "AI Image Editing",
            "Presentation Design",
            "Background Removal",
            "Infographic Design",
            "Vector Tracing",
            "Resume Design"
          ],
          newTags: ["AI Image Editing"]
        },
        {
          name: "Marketing Design",
          fields: [
            "Social Media Design",
            "Social Posts & Banners",
            "Email Design",
            "Web Banners",
            "Signage Design"
          ]
        },
        {
          name: "Packaging & Covers",
          fields: [
            "Packaging & Label Design",
            "Book Design",
            "Book Cover Design",
            "Album Cover Design"
          ]
        },
        {
          name: "3D Design",
          fields: [
            "3D Architecture",
            "3D Industrial Design",
            "3D Fashion & Garment",
            "3D Printing Characters",
            "3D Landscape",
            "3D Game Art",
            "3D Jewelry Design"
          ]
        },
        {
          name: "Architecture & Building Design",
          fields: [
            "Architecture & Interior Design",
            "Landscape Design",
            "Building Engineering",
            "Lighting Design"
          ]
        },
        {
          name: "Fashion & Merchandise",
          fields: [
            "T-Shirts & Merchandise",
            "Fashion Design",
            "Jewelry Design"
          ]
        }
      ]
    },
    {
      category: "Programming & Tech",
      subcategories: [
        {
          name: "Website Development",
          fields: [
            "Website Development",
            "E-Commerce Development",
            "Landing Page Development",
            "WordPress",
            "Shopify",
            "Wix",
            "Webflow"
          ]
        },
        {
          name: "Application Development",
          fields: [
            "Mobile Apps",
            "Web Applications",
            "Desktop Applications",
            "Game Development",
            "AI Applications"
          ],
          newTags: ["AI Applications"]
        },
        {
          name: "Software Development",
          fields: [
            "Software Development",
            "Web Scraping",
            "Automation",
            "Chatbots",
            "Support & IT"
          ]
        },
        {
          name: "Development Tools",
          fields: [
            "QA & Review",
            "User Testing",
            "Online Coding Lessons",
            "Convert Files",
            "Database"
          ]
        },
        {
          name: "Data",
          fields: [
            "Data Analysis",
            "Data Visualization",
            "Data Science",
            "Databases",
            "Data Processing",
            "Data Entry"
          ]
        }
      ]
    },
    {
      category: "Digital Marketing",
      subcategories: [
        {
          name: "Search Marketing",
          fields: [
            "SEO",
            "SEM",
            "Local SEO",
            "E-Commerce SEO"
          ]
        },
        {
          name: "Social Media",
          fields: [
            "Social Media Marketing",
            "Influencer Marketing",
            "Community Management",
            "Social Media Advertising"
          ]
        },
        {
          name: "Advertising & Paid Marketing",
          fields: [
            "Display Advertising",
            "PPC",
            "Email Marketing",
            "Mobile Marketing"
          ]
        },
        {
          name: "Content Marketing",
          fields: [
            "Video Marketing",
            "Content Strategy",
            "Affiliate Marketing",
            "Web Analytics"
          ]
        }
      ]
    },
    {
      category: "Video & Animation",
      subcategories: [
        {
          name: "Video Editing",
          fields: [
            "Video Editing",
            "Short Video Ads",
            "Social Media Videos",
            "Animation",
            "Music Videos"
          ]
        },
        {
          name: "Animation",
          fields: [
            "3D Animation",
            "2D Animation",
            "Character Animation",
            "Whiteboard & Explainer Videos",
            "Motion Graphics"
          ]
        },
        {
          name: "Production",
          fields: [
            "Video Production",
            "Filming & Videography",
            "AI Video Generation",
            "Drone Videography"
          ],
          newTags: ["AI Video Generation"]
        },
        {
          name: "Product Videos",
          fields: [
            "Explainer Videos",
            "Product Photography",
            "E-Commerce Product Videos",
            "Unboxing Videos",
            "App & Website Previews"
          ]
        }
      ]
    },
    {
      category: "Writing & Translation",
      subcategories: [
        {
          name: "Content Writing",
          fields: [
            "Articles & Blog Posts",
            "Content Strategy",
            "Website Content",
            "Product Descriptions",
            "Creative Writing"
          ]
        },
        {
          name: "Translation & Transcription",
          fields: [
            "Translation",
            "Transcription",
            "Localization",
            "Subtitles & Captions"
          ]
        },
        {
          name: "Business & Technical",
          fields: [
            "Business Plans",
            "Technical Writing",
            "UX Writing",
            "Grant Writing",
            "Legal Writing"
          ]
        },
        {
          name: "AI Content Services",
          fields: [
            "AI-Assisted Writing",
            "Chatbot Prompts",
            "AI Training Data",
            "AI Editing & Proofreading"
          ],
          newTags: ["AI-Assisted Writing", "Chatbot Prompts"]
        }
      ]
    },
    {
      category: "Music & Audio",
      subcategories: [
        {
          name: "Music Production",
          fields: [
            "Producers & Composers",
            "Singers & Vocalists",
            "Session Musicians",
            "Songwriters",
            "Beat Making"
          ]
        },
        {
          name: "Audio Engineering",
          fields: [
            "Mixing & Mastering",
            "Audio Editing",
            "Voice Over",
            "Sound Design",
            "Podcast Production"
          ]
        },
        {
          name: "Audio Services",
          fields: [
            "Jingles & Intros",
            "Sound Effects",
            "AI Voice Generation",
            "Meditation Music",
            "Online Music Lessons"
          ],
          newTags: ["AI Voice Generation"]
        }
      ]
    },
    {
      category: "Business",
      subcategories: [
        {
          name: "Business Strategy",
          fields: [
            "Business Plans",
            "Market Research",
            "Business Consulting",
            "Financial Consulting",
            "Legal Consulting"
          ]
        },
        {
          name: "Business Operations",
          fields: [
            "Virtual Assistant",
            "E-Commerce Management",
            "Project Management",
            "Supply Chain Management",
            "Business Analysis"
          ]
        },
        {
          name: "Sales & Customer Care",
          fields: [
            "Lead Generation",
            "CRM Management",
            "Customer Support",
            "Sales Funnel"
          ]
        },
        {
          name: "HR & Training",
          fields: [
            "HR Consulting",
            "Recruitment",
            "Career Counseling",
            "Corporate Training",
            "Employee Engagement"
          ]
        }
      ]
    },
    {
      category: "Finance",
      subcategories: [
        {
          name: "Financial Planning",
          fields: [
            "Financial Analysis",
            "Investment Planning",
            "Retirement Planning",
            "Tax Preparation",
            "CFO Services"
          ]
        },
        {
          name: "Accounting & Bookkeeping",
          fields: [
            "Bookkeeping",
            "Accounting",
            "Financial Statements",
            "Payroll Processing",
            "Invoicing"
          ]
        },
        {
          name: "Financial Analysis",
          fields: [
            "Valuation Services",
            "Financial Modeling",
            "Financial Research",
            "Financial Forecasting",
            "Risk Management"
          ]
        }
      ]
    },
    {
      category: "AI Services",
      subcategories: [
        {
          name: "AI Creative Tools",
          fields: [
            "AI Artists",
            "AI Music Generation",
            "AI Video Generation",
            "AI Voice Generation",
            "AI Writing Assistance"
          ],
          newTags: ["AI Video Generation"]
        },
        {
          name: "AI Development",
          fields: [
            "AI Applications",
            "AI Chatbots",
            "AI Training & Data",
            "AI Integration",
            "Custom AI Solutions"
          ],
          newTags: ["Custom AI Solutions"]
        },
        {
          name: "AI Business Solutions",
          fields: [
            "AI Data Analysis",
            "AI Marketing Solutions",
            "AI Customer Service",
            "AI Process Automation",
            "AI Strategy Consulting"
          ]
        }
      ]
    },
    {
      category: "Personal Growth",
      subcategories: [
        {
          name: "Self Improvement",
          fields: [
            "Life Coaching",
            "Career Counseling",
            "Leadership Development",
            "Confidence Building",
            "Mindfulness & Meditation"
          ]
        },
        {
          name: "Learning & Training",
          fields: [
            "Online Courses",
            "Language Learning",
            "Skills Development",
            "Public Speaking",
            "Interview Preparation"
          ]
        },
        {
          name: "Health & Fitness",
          fields: [
            "Fitness Training",
            "Nutrition Planning",
            "Wellness Coaching",
            "Mental Health Support",
            "Yoga & Meditation"
          ]
        }
      ]
    }
  ];
  
  export default fiverrCategories;