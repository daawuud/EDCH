export const adminContent = {
  stats: [
    { label: "Total programs", value: "6", tone: "blue" },
    { label: "Upcoming events", value: "3", tone: "green" },
    { label: "Resources", value: "6", tone: "blue" },
    { label: "Contact messages", value: "4", tone: "green" },
    { label: "Members placeholder", value: "8", tone: "blue" }
  ],
  quickActions: [
    { label: "Manage Pages", href: "/admin/pages" },
    { label: "Add Event", href: "/admin/events" },
    { label: "Review Messages", href: "/admin/messages" },
    { label: "Site Settings", href: "/admin/settings" }
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
