export const adminContent = {
  dashboardCards: [
    {
      title: "Services",
      description:
        "Manage EDCH service areas such as community support, disability service navigation, advocacy, family support, newcomer support, and resource sharing.",
      href: "/admin/services",
      accent: "blue"
    },
    {
      title: "Programs",
      description:
        "Manage community programs, training sessions, workshops, and support activities.",
      href: "/admin/programs",
      accent: "green"
    },
    {
      title: "Events",
      description:
        "Manage upcoming community events, workshops, meetings, and training days.",
      href: "/admin/events",
      accent: "blue"
    },
    {
      title: "Resources",
      description:
        "Manage helpful links, guides, disability information, transportation resources, and community supports.",
      href: "/admin/resources",
      accent: "green"
    },
    {
      title: "Benefits & Supports",
      description:
        "Review the Benefits & Supports navigation structure, submenu items, public guide links, and ADAP management path.",
      href: "/admin/benefits",
      accent: "blue"
    },
    {
      title: "ADAP",
      description:
        "Manage the ADAP homepage alert, public ADAP information, document checklist, and translated letter PDFs.",
      href: "/admin/adap",
      accent: "blue"
    },
    {
      title: "Members",
      description:
        "Manage community members, volunteers, supporters, and future board member records.",
      href: "/admin/members",
      accent: "blue"
    },
    {
      title: "Contact Messages",
      description: "Review contact form submissions and community inquiries.",
      href: "/admin/messages",
      accent: "green"
    },
    {
      title: "Website Pages",
      description:
        "Manage editable page content such as Home, About, Donate, Contact, and other public page text.",
      href: "/admin/pages",
      accent: "blue"
    },
    {
      title: "Site Settings",
      description:
        "Manage organization name, email, phone number, location, social links, and website settings.",
      href: "/admin/settings",
      accent: "green"
    }
  ],
  stats: [
    { label: "Programs", value: "6", tone: "blue", href: "/admin/programs" },
    { label: "Events", value: "3", tone: "green", href: "/admin/events" },
    { label: "Resources", value: "6", tone: "blue", href: "/admin/resources" },
    { label: "Messages", value: "4", tone: "green", href: "/admin/messages" },
    { label: "Members", value: "8", tone: "blue", href: "/admin/members" }
  ],
  quickActions: [
    { label: "Add Service", href: "/admin/services" },
    { label: "Add Program", href: "/admin/programs" },
    { label: "Add Event", href: "/admin/events" },
    { label: "Review Benefits", href: "/admin/benefits" },
    { label: "Update ADAP", href: "/admin/adap" },
    { label: "View Messages", href: "/admin/messages" },
    { label: "Edit Settings", href: "/admin/settings" }
  ],
  pages: [
    { page: "Home", status: "Draft-ready", updated: "Demo content" },
    { page: "About", status: "Published", updated: "Demo content" },
    { page: "Donate", status: "Draft-ready", updated: "Demo content" },
    { page: "Contact", status: "Published", updated: "Demo content" }
  ],
  services: [
    { title: "Community Support", category: "Support", status: "Visible" },
    { title: "Disability Service Navigation", category: "Navigation", status: "Visible" },
    { title: "Advocacy and Rights Awareness", category: "Education", status: "Visible" },
    { title: "Family and Caregiver Support", category: "Family", status: "Visible" },
    { title: "Newcomer Disability Support", category: "Newcomer", status: "Visible" },
    { title: "Resource Sharing", category: "Resources", status: "Visible" }
  ],
  programs: [
    { title: "Monthly Community Meetings", category: "Community", status: "Planning" },
    { title: "Digital Skills Training", category: "Training", status: "Planning" },
    { title: "English and Citizenship Support", category: "Learning", status: "Planning" },
    { title: "Accessibility Awareness", category: "Education", status: "Planning" },
    { title: "Family Support Sessions", category: "Family", status: "Planning" },
    { title: "Volunteer Leadership", category: "Leadership", status: "Planning" }
  ],
  events: [
    {
      title: "Community Information Session",
      date: "To be confirmed",
      location: "Edmonton",
      status: "Sample"
    },
    {
      title: "Disability Services Workshop",
      date: "To be confirmed",
      location: "Edmonton",
      status: "Sample"
    },
    {
      title: "Digital Skills Training Day",
      date: "To be confirmed",
      location: "Edmonton",
      status: "Sample"
    }
  ],
  resources: [
    { title: "Alberta Disability Services", category: "Government", link: "Placeholder" },
    { title: "AISH Information", category: "Benefits", link: "Placeholder" },
    { title: "Accessible Transportation", category: "Mobility", link: "Placeholder" },
    { title: "Community Legal Support", category: "Legal", link: "Placeholder" },
    { title: "Settlement Services", category: "Newcomer", link: "Placeholder" },
    { title: "Accessibility Rights", category: "Rights", link: "Placeholder" }
  ],
  members: [
    { name: "Community member placeholder", role: "Member", status: "Demo only" },
    { name: "Volunteer placeholder", role: "Volunteer", status: "Demo only" },
    { name: "Supporter placeholder", role: "Supporter", status: "Demo only" }
  ],
  messages: [
    { name: "Demo contact", interest: "Join EDCH", status: "Unread" },
    { name: "Demo volunteer", interest: "Volunteer", status: "Unread" },
    { name: "Demo partner", interest: "Partner with EDCH", status: "Read" },
    { name: "Demo supporter", interest: "Support or Donate", status: "Read" }
  ],
  settings: {
    organizationName: "Edmonton Disability Community Hub",
    email: "info@example.com",
    phone: "To be added",
    location: "Edmonton, Alberta, Canada",
    facebook: "",
    instagram: "",
    linkedin: ""
  }
};
