"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";

type Section = "Overview" | "Campaigns" | "Content Studio" | "Brand Kit" | "Approvals";
type CampaignStatus = "In progress" | "Planning" | "Completed";
type ContentStatus = "Draft" | "In Review" | "Approved";
type IconName =
  | "overview"
  | "campaigns"
  | "studio"
  | "brand"
  | "approvals"
  | "search"
  | "plus"
  | "arrow"
  | "calendar"
  | "chevron"
  | "spark"
  | "menu"
  | "close"
  | "filter"
  | "check"
  | "clock"
  | "more";

type Campaign = {
  id: number;
  title: string;
  client: string;
  channel: string;
  status: CampaignStatus;
  progress: number;
  color: string;
};

type ContentItem = {
  id: number;
  title: string;
  campaign: string;
  platform: string;
  type: string;
  status: ContentStatus;
  date: string;
  format: "portrait" | "square" | "landscape";
  accent: string;
  copy: string;
};

const navigation: { name: Section; icon: IconName }[] = [
  { name: "Overview", icon: "overview" },
  { name: "Campaigns", icon: "campaigns" },
  { name: "Content Studio", icon: "studio" },
  { name: "Brand Kit", icon: "brand" },
  { name: "Approvals", icon: "approvals" },
];

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Autumn, Unfolded",
    client: "Sunday Supply Co.",
    channel: "Instagram · Email",
    status: "In progress",
    progress: 72,
    color: "lavender",
  },
  {
    id: 2,
    title: "A Little More Ritual",
    client: "Morrow Skincare",
    channel: "TikTok · Instagram",
    status: "In progress",
    progress: 48,
    color: "peach",
  },
  {
    id: 3,
    title: "Made for Slow Mornings",
    client: "Form & Field",
    channel: "Pinterest · Email",
    status: "Planning",
    progress: 24,
    color: "sage",
  },
  {
    id: 4,
    title: "Good Things, Grown",
    client: "Little Acre",
    channel: "Instagram",
    status: "Completed",
    progress: 100,
    color: "sand",
  },
];

const initialContent: ContentItem[] = [
  {
    id: 1,
    title: "The Sunday reset",
    campaign: "Autumn, Unfolded",
    platform: "Instagram",
    type: "Carousel",
    status: "In Review",
    date: "Today, 2:30 PM",
    format: "portrait",
    accent: "lavender",
    copy: "A softer start to the week, with little rituals that make room for what matters. Save this for your next slow Sunday.",
  },
  {
    id: 2,
    title: "A ritual worth keeping",
    campaign: "A Little More Ritual",
    platform: "TikTok",
    type: "Short video",
    status: "Draft",
    date: "Tomorrow, 10:00 AM",
    format: "portrait",
    accent: "peach",
    copy: "Five quiet minutes can change the shape of your whole morning. Here is a small ritual to come back to.",
  },
  {
    id: 3,
    title: "Slow mornings, better days",
    campaign: "Made for Slow Mornings",
    platform: "Pinterest",
    type: "Pin",
    status: "Approved",
    date: "Oct 30, 9:00 AM",
    format: "square",
    accent: "sage",
    copy: "Make the everyday feel a little more intentional. Thoughtful pieces, made to be part of your morning.",
  },
  {
    id: 4,
    title: "The pieces we reach for",
    campaign: "Autumn, Unfolded",
    platform: "Instagram",
    type: "Photo post",
    status: "Draft",
    date: "Oct 31, 11:00 AM",
    format: "square",
    accent: "sand",
    copy: "The ones that make getting dressed feel easy. Meet the layers we will be living in this season.",
  },
  {
    id: 5,
    title: "Small joys, gathered",
    campaign: "Good Things, Grown",
    platform: "Email",
    type: "Newsletter",
    status: "In Review",
    date: "Nov 1, 8:00 AM",
    format: "landscape",
    accent: "sage",
    copy: "A note from the garden: what is growing, what is in season, and a few small things making us smile.",
  },
];

const upcomingItems = [
  { day: "28", month: "OCT", title: "The Sunday reset", detail: "Instagram · Carousel", color: "lavender" },
  { day: "29", month: "OCT", title: "A ritual worth keeping", detail: "TikTok · Short video", color: "peach" },
  { day: "30", month: "OCT", title: "Slow mornings, better days", detail: "Pinterest · Pin", color: "sage" },
];

const activityItems = [
  { initials: "AM", name: "Alex Morgan", action: "left feedback on", subject: "The Sunday reset", time: "12 min ago", color: "lavender" },
  { initials: "JL", name: "Jamie Lee", action: "approved", subject: "Fall palette, revealed", time: "1 hr ago", color: "sage" },
  { initials: "You", name: "You", action: "created a new campaign", subject: "Made for Slow Mornings", time: "Yesterday", color: "peach" },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    campaigns: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M8 7h8M8 11h6" /></>,
    studio: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12" /><circle cx="12" cy="12" r="4" /></>,
    brand: <><path d="M12 3a9 9 0 1 0 0 18h1.1a2 2 0 0 0 1.5-3.3 1.7 1.7 0 0 1 1.3-2.8H18a3 3 0 0 0 3-3c0-5-4-8.9-9-8.9Z" /><path d="M7.5 12h.01M10 7.5h.01M15 7.5h.01" /></>,
    approvals: <><path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="9" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1 2.5 2 1-2 1-1 2.5-1-2.5-2-1 2-1 1-2.5Z" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    filter: <><path d="M4 7h16M7 12h10m-7 5h4" /><circle cx="8" cy="7" r="2" /><circle cx="15" cy="12" r="2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function StatusBadge({ status }: { status: CampaignStatus | ContentStatus }) {
  const className = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status-badge status-${className}`}>{status}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="section-description">{description}</p>
      </div>
      {action}
    </div>
  );
}

function AppLogo() {
  return (
    <div className="brand-lockup" aria-label="BrandPilot">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="brand-wordmark">brandpilot<span>.</span></span>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("Overview");
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [content, setContent] = useState(initialContent);
  const [search, setSearch] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("All statuses");
  const [contentFilter, setContentFilter] = useState("All content");
  const [selectedContentId, setSelectedContentId] = useState(initialContent[0].id);
  const [isCampaignFormOpen, setIsCampaignFormOpen] = useState(false);
  const [formFeedback, setFormFeedback] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredCampaigns = useMemo(() => {
    const query = search.trim().toLowerCase();
    return campaigns.filter((campaign) => {
      const matchesSearch =
        !query ||
        campaign.title.toLowerCase().includes(query) ||
        campaign.client.toLowerCase().includes(query) ||
        campaign.channel.toLowerCase().includes(query);
      return matchesSearch && (campaignFilter === "All statuses" || campaign.status === campaignFilter);
    });
  }, [campaignFilter, campaigns, search]);

  const filteredContent = content.filter(
    (item) => contentFilter === "All content" || item.status === contentFilter,
  );
  const selectedContent =
    filteredContent.find((item) => item.id === selectedContentId) ??
    filteredContent[0] ??
    content.find((item) => item.id === selectedContentId) ??
    content[0];
  const activeCampaignCount = campaigns.filter((item) => item.status !== "Completed").length;
  const draftCount = content.filter((item) => item.status === "Draft").length;
  const reviewCount = content.filter((item) => item.status === "In Review").length;
  const approvedCount = content.filter((item) => item.status === "Approved").length;

  function updateContentStatus(id: number, status: ContentStatus) {
    setContent((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const client = String(formData.get("client") ?? "").trim();
    const channel = String(formData.get("channel") ?? "");

    if (!title || !client || !channel) {
      setFormFeedback("Complete each field before creating your campaign.");
      return;
    }

    const newCampaign: Campaign = {
      id: Date.now(),
      title,
      client,
      channel,
      status: "Planning",
      progress: 0,
      color: ["lavender", "peach", "sage"][campaigns.length % 3],
    };
    setCampaigns((items) => [newCampaign, ...items]);
    setCampaignFilter("All statuses");
    setSearch("");
    setFormFeedback("");
    setIsCampaignFormOpen(false);
    event.currentTarget.reset();
  }

  function setSection(section: Section) {
    setActiveSection(section);
    setMobileNavOpen(false);
    setSearch("");
  }

  const createCampaignButton = (
    <button className="button button-primary" onClick={() => setIsCampaignFormOpen(true)}>
      <Icon name="plus" size={17} />
      <span>New campaign</span>
    </button>
  );

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <AppLogo />
          <button
            className="icon-button mobile-nav-close"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          >
            <Icon name="close" />
          </button>
          <div className="workspace-switcher">
            <span className="workspace-avatar">S</span>
            <span className="workspace-info">
              <strong>Studio North</strong>
              <small>Creative workspace</small>
            </span>
            <Icon name="chevron" size={16} />
          </div>
          <p className="nav-label">WORKSPACE</p>
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <button
                key={item.name}
                className={`nav-item ${activeSection === item.name ? "nav-item-active" : ""}`}
                onClick={() => setSection(item.name)}
                aria-current={activeSection === item.name ? "page" : undefined}
              >
                <Icon name={item.icon} size={19} />
                <span>{item.name}</span>
                {item.name === "Approvals" && reviewCount > 0 && (
                  <span className="nav-count">{reviewCount}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="sidebar-note">
            <span className="note-icon"><Icon name="spark" size={17} /></span>
            <strong>A little more focus.</strong>
            <p>Your creative work, all in one considered place.</p>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div className="plan-card">
            <div className="plan-card-top">
              <span>Workspace plan</span>
              <span className="plan-tag">Studio</span>
            </div>
            <div className="plan-meter"><span /></div>
            <p><strong>8 of 12</strong> active projects</p>
          </div>
          <div className="profile-button">
            <span className="profile-avatar">JM</span>
            <span className="profile-copy"><strong>Jordan Miller</strong><small>Workspace owner</small></span>
            <Icon name="more" size={18} />
          </div>
        </div>
      </aside>

      {mobileNavOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
              <Icon name="menu" />
            </button>
            <div className="breadcrumb"><span>Studio North</span><Icon name="chevron" size={14} /><strong>{activeSection}</strong></div>
          </div>
          <div className="topbar-right">
            <span className="today-label"><Icon name="calendar" size={16} /> Wednesday, October 28</span>
            <span className="topbar-avatar" aria-hidden="true">JM</span>
          </div>
        </header>

        <div className="content-wrap">
          {activeSection === "Overview" && (
            <>
              <SectionHeading
                eyebrow="WEDNESDAY, OCTOBER 28, 2026"
                title="Good morning, Jordan"
                description="A clear view of what's moving and what needs your eye."
                action={createCampaignButton}
              />
              <section className="metrics-grid" aria-label="Workspace summary">
                <MetricCard label="Active campaigns" value={activeCampaignCount} detail="+2 this month" icon="campaigns" tone="lavender" />
                <MetricCard label="Content drafts" value={draftCount} detail="Across 4 campaigns" icon="studio" tone="peach" />
                <MetricCard label="Pending approvals" value={reviewCount} detail={reviewCount ? "Ready for your review" : "You're all caught up"} icon="approvals" tone="sage" />
                <MetricCard label="Published items" value={18} detail="Sample data · this month" icon="arrow" tone="sand" />
              </section>

              <div className="overview-grid">
                <section className="panel campaigns-panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">IN MOTION</p><h2>Campaigns</h2></div>
                    <button className="text-button" onClick={() => setSection("Campaigns")}>View all <Icon name="arrow" size={15} /></button>
                  </div>
                  <div className="overview-campaigns">
                    {campaigns.filter((campaign) => campaign.status !== "Completed").slice(0, 3).map((campaign) => (
                      <CampaignProgress key={campaign.id} campaign={campaign} />
                    ))}
                  </div>
                  {campaigns.filter((campaign) => campaign.status !== "Completed").length === 0 && <p className="empty-note">No active campaigns yet. Create one to get started.</p>}
                </section>

                <section className="panel upcoming-panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">ON THE CALENDAR</p><h2>Coming up</h2></div>
                    <button className="icon-button subtle-icon" aria-label="Open content studio" onClick={() => setSection("Content Studio")}><Icon name="arrow" size={16} /></button>
                  </div>
                  <div className="upcoming-list">
                    {upcomingItems.map((item) => (
                      <div className="upcoming-item" key={item.title}>
                        <div className={`date-tile tone-${item.color}`}><strong>{item.day}</strong><span>{item.month}</span></div>
                        <div className="upcoming-copy"><strong>{item.title}</strong><span>{item.detail}</span></div>
                        <Icon name="chevron" size={16} />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="panel activity-panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">THE LATEST</p><h2>Recent activity</h2></div>
                    <span className="quiet-label">This week</span>
                  </div>
                  <div className="activity-list">
                    {activityItems.map((item) => (
                      <div className="activity-item" key={`${item.name}-${item.subject}`}>
                        <span className={`activity-avatar tone-${item.color}`}>{item.initials}</span>
                        <p><strong>{item.name}</strong> {item.action} <b>{item.subject}</b><span>{item.time}</span></p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="studio-callout">
                  <div className="callout-copy">
                    <span className="callout-kicker"><Icon name="spark" size={15} /> YOUR CREATIVE SPACE</span>
                    <h2>Good ideas deserve<br />a little room to grow.</h2>
                    <p>Pick up where you left off in Content Studio.</p>
                    <button className="button button-dark" onClick={() => setSection("Content Studio")}>Open Content Studio <Icon name="arrow" size={16} /></button>
                  </div>
                  <div className="callout-art" aria-hidden="true">
                    <span className="art-shape art-shape-one" />
                    <span className="art-shape art-shape-two" />
                    <span className="art-shape art-shape-three" />
                    <span className="art-sun" />
                    <span className="art-caption">a softer<br />kind of work</span>
                  </div>
                </section>
              </div>
            </>
          )}

          {activeSection === "Campaigns" && (
            <>
              <SectionHeading
                eyebrow="YOUR CREATIVE WORK"
                title="Campaigns"
                description="Plan the work, keep the moving parts in view."
                action={createCampaignButton}
              />
              <section className="panel list-panel">
                <div className="list-toolbar">
                  <label className="search-field">
                    <Icon name="search" size={18} />
                    <span className="visually-hidden">Search campaigns</span>
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search campaigns or clients" />
                  </label>
                  <label className="select-field">
                    <Icon name="filter" size={17} />
                    <span className="visually-hidden">Filter campaigns by status</span>
                    <select value={campaignFilter} onChange={(event) => setCampaignFilter(event.target.value)}>
                      <option>All statuses</option>
                      <option>In progress</option>
                      <option>Planning</option>
                      <option>Completed</option>
                    </select>
                  </label>
                </div>
                <div className="table-scroll">
                  <table className="campaign-table">
                    <thead><tr><th>Campaign</th><th>Channels</th><th>Status</th><th>Progress</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
                    <tbody>
                      {filteredCampaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td><div className="campaign-cell"><span className={`campaign-dot tone-${campaign.color}`} /><span><strong>{campaign.title}</strong><small>{campaign.client}</small></span></div></td>
                          <td>{campaign.channel}</td>
                          <td><StatusBadge status={campaign.status} /></td>
                          <td><div className="table-progress"><span className="progress-track"><span style={{ width: `${campaign.progress}%` }} /></span><small>{campaign.progress}%</small></div></td>
                          <td><button className="icon-button subtle-icon" aria-label={`View ${campaign.title}`} onClick={() => setSection("Overview")}><Icon name="arrow" size={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredCampaigns.length === 0 && <div className="empty-state"><span className="empty-state-icon"><Icon name="search" size={20} /></span><strong>No campaigns found</strong><p>Try a different search or status filter.</p></div>}
                </div>
                <p className="table-footer">Showing {filteredCampaigns.length} of {campaigns.length} campaigns</p>
              </section>
            </>
          )}

          {activeSection === "Content Studio" && (
            <>
              <SectionHeading
                eyebrow="MAKE ROOM FOR GOOD IDEAS"
                title="Content Studio"
                description="A working view of what you're shaping, sharing, and saving."
                action={<button className="button button-primary" onClick={() => { setContentFilter("Draft"); const firstDraft = content.find((item) => item.status === "Draft"); if (firstDraft) setSelectedContentId(firstDraft.id); }}><Icon name="filter" size={17} /><span>View drafts</span></button>}
              />
              <div className="studio-toolbar">
                <div className="filter-tabs" role="group" aria-label="Filter content">
                  {["All content", "Draft", "In Review", "Approved"].map((filter) => (
                    <button key={filter} className={contentFilter === filter ? "filter-tab active-filter-tab" : "filter-tab"} onClick={() => { setContentFilter(filter); const firstItem = content.find((item) => filter === "All content" || item.status === filter); if (firstItem) setSelectedContentId(firstItem.id); }}>{filter}</button>
                  ))}
                </div>
                <span className="quiet-label">{filteredContent.length} pieces of content</span>
              </div>
              <div className="studio-layout">
                <section className="content-grid" aria-label="Content items">
                  {filteredContent.map((item) => (
                    <button className={`content-card ${selectedContentId === item.id ? "content-card-selected" : ""}`} key={item.id} onClick={() => setSelectedContentId(item.id)} aria-pressed={selectedContentId === item.id}>
                      <ContentArtwork item={item} />
                      <div className="content-card-copy">
                        <div className="content-card-top"><span>{item.platform} · {item.type}</span><StatusBadge status={item.status} /></div>
                        <strong>{item.title}</strong>
                        <span className="content-campaign">{item.campaign}</span>
                      </div>
                    </button>
                  ))}
                  {filteredContent.length === 0 && <div className="empty-state"><strong>Nothing in this view yet</strong><p>Choose another status to see more content.</p></div>}
                </section>
                {selectedContent && (
                  <aside className="panel content-preview" aria-label="Selected content preview">
                    <div className="panel-heading"><div><p className="eyebrow">PREVIEW</p><h2>In the making</h2></div><span className="icon-button subtle-icon" aria-hidden="true"><Icon name="more" size={18} /></span></div>
                    <ContentArtwork item={selectedContent} large />
                    <p className="preview-platform">{selectedContent.platform} · {selectedContent.type}</p>
                    <h3>{selectedContent.title}</h3>
                    <p className="preview-copy">{selectedContent.copy}</p>
                    <div className="preview-meta"><span>Campaign</span><strong>{selectedContent.campaign}</strong></div>
                    <div className="preview-meta"><span>Scheduled</span><strong>{selectedContent.date}</strong></div>
                    <label className="status-control"><span>Content status</span><select value={selectedContent.status} onChange={(event) => updateContentStatus(selectedContent.id, event.target.value as ContentStatus)}><option>Draft</option><option>In Review</option><option>Approved</option></select></label>
                  </aside>
                )}
              </div>
            </>
          )}

          {activeSection === "Brand Kit" && (
            <>
              <SectionHeading eyebrow="THE DETAILS THAT MAKE IT YOURS" title="Brand Kit" description="A shared reference for keeping the good things consistent." />
              <div className="brand-kit-grid">
                <section className="panel brand-intro">
                  <div className="brand-intro-heading"><span className="brand-symbol">S</span><div><p className="eyebrow">BRAND GUIDELINES</p><h2>Sunday Supply Co.</h2></div><span className="status-badge status-approved">Active</span></div>
                  <p className="brand-intro-copy">Everyday essentials for slower, more thoughtful living. Made with care, chosen to last, and always a little softer around the edges.</p>
                  <div className="brand-meta-grid"><div><span>Industry</span><strong>Home & lifestyle</strong></div><div><span>Audience</span><strong>The considered homebody</strong></div><div><span>Last updated</span><strong>October 14, 2025</strong></div><div><span>Brand owner</span><strong>Alex Morgan</strong></div></div>
                </section>
                <section className="panel palette-panel">
                  <div className="panel-heading"><div><p className="eyebrow">COLOR, WITH INTENTION</p><h2>Color palette</h2></div><button className="quiet-action">5 colors</button></div>
                  <div className="color-swatches">
                    {[
                      { name: "Ink", hex: "#292724", tone: "ink" },
                      { name: "Oat milk", hex: "#F2EDE4", tone: "oat" },
                      { name: "Soft lilac", hex: "#D8CDEA", tone: "lilac" },
                      { name: "Apricot", hex: "#F2C6AE", tone: "apricot" },
                      { name: "Sage", hex: "#B7C4AF", tone: "sage-swatch" },
                    ].map((color) => (
                      <div className="swatch-item" key={color.name}><span className={`swatch swatch-${color.tone}`} /><strong>{color.name}</strong><code>{color.hex}</code></div>
                    ))}
                  </div>
                </section>
                <section className="panel type-panel">
                  <div className="panel-heading"><div><p className="eyebrow">LET IT BREATHE</p><h2>Typography</h2></div></div>
                  <div className="type-specimen"><span>DISPLAY · EDITORIAL NEW</span><strong className="specimen-serif">The everyday,<br />a little more lovely.</strong><p>Use for headlines, thoughtful statements, and short moments of emphasis.</p></div>
                  <div className="type-secondary"><span>BODY · INTER</span><strong>Made for living.</strong><p>Keep body copy easy to read. Let the photography and details have room.</p></div>
                </section>
                <section className="panel voice-panel">
                  <div className="panel-heading"><div><p className="eyebrow">SOUND LIKE YOU</p><h2>Tone of voice</h2></div></div>
                  <div className="voice-tags"><span>Warm, not sugary</span><span>Considered, not precious</span><span>Quietly confident</span></div>
                  <div className="voice-example"><span>WE SAY</span><p>“A few good things for slower mornings.”</p></div>
                  <div className="voice-example avoid-example"><span>WE AVOID</span><p>“You NEED this life-changing must-have!”</p></div>
                </section>
                <section className="panel guidelines-panel">
                  <div className="panel-heading"><div><p className="eyebrow">A FEW GOOD REMINDERS</p><h2>Writing guidelines</h2></div></div>
                  <ul className="guideline-list">
                    <li><span className="guideline-check"><Icon name="check" size={14} /></span><span><strong>Keep it human.</strong> Write as if you are talking to one thoughtful friend.</span></li>
                    <li><span className="guideline-check"><Icon name="check" size={14} /></span><span><strong>Leave room to breathe.</strong> Short sentences. Clear meaning. No rush.</span></li>
                    <li><span className="guideline-check"><Icon name="check" size={14} /></span><span><strong>Be specific, never loud.</strong> Show the small details that make something worth keeping.</span></li>
                  </ul>
                </section>
              </div>
            </>
          )}

          {activeSection === "Approvals" && (
            <>
              <SectionHeading eyebrow="A GOOD SECOND LOOK" title="Approvals" description="Keep the feedback loop clear, and the next step easy to find." />
              <div className="approval-summary">
                <div className="approval-summary-item"><span className="approval-summary-icon tone-peach"><Icon name="clock" size={18} /></span><span><strong>{reviewCount}</strong><small>Waiting for review</small></span></div>
                <div className="approval-summary-item"><span className="approval-summary-icon tone-lavender"><Icon name="studio" size={18} /></span><span><strong>{draftCount}</strong><small>Still in draft</small></span></div>
                <div className="approval-summary-item"><span className="approval-summary-icon tone-sage"><Icon name="check" size={18} /></span><span><strong>{approvedCount}</strong><small>Approved</small></span></div>
              </div>
              <section className="panel approvals-panel">
                <div className="panel-heading approval-panel-heading"><div><p className="eyebrow">CONTENT WORKFLOW</p><h2>Everything in its right place</h2></div><label className="select-field approval-filter"><Icon name="filter" size={17} /><span className="visually-hidden">Filter approval items</span><select value={contentFilter} onChange={(event) => setContentFilter(event.target.value)}><option>All content</option><option>Draft</option><option>In Review</option><option>Approved</option></select></label></div>
                <div className="approval-list">
                  {filteredContent.map((item) => (
                    <article className="approval-item" key={item.id}>
                      <ContentArtwork item={item} compact />
                      <div className="approval-item-copy"><StatusBadge status={item.status} /><h3>{item.title}</h3><p>{item.campaign} <span>·</span> {item.platform} · {item.type}</p><small><Icon name="calendar" size={14} /> {item.date}</small></div>
                      <div className="approval-actions">
                        <label className="status-control"><span>Status</span><select aria-label={`Status for ${item.title}`} value={item.status} onChange={(event) => updateContentStatus(item.id, event.target.value as ContentStatus)}><option>Draft</option><option>In Review</option><option>Approved</option></select></label>
                        {item.status === "In Review" && <button className="button button-primary approve-button" onClick={() => updateContentStatus(item.id, "Approved")}><Icon name="check" size={16} /><span>Approve</span></button>}
                        {item.status === "Draft" && <button className="text-button review-button" onClick={() => updateContentStatus(item.id, "In Review")}>Send to review <Icon name="arrow" size={15} /></button>}
                      </div>
                    </article>
                  ))}
                  {filteredContent.length === 0 && <div className="empty-state"><strong>No items in this status</strong><p>Try another filter to see more work.</p></div>}
                </div>
              </section>
            </>
          )}
        </div>
        <footer className="app-footer"><span>Made for the work you love.</span><span>BrandPilot <i>·</i> Sample workspace data</span></footer>
      </main>

      {isCampaignFormOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCampaignFormOpen(false); }}>
          <section className="campaign-modal" role="dialog" aria-modal="true" aria-labelledby="campaign-modal-title" onKeyDown={(event) => { if (event.key === "Escape") setIsCampaignFormOpen(false); }}>
            <div className="modal-heading"><div><p className="eyebrow">A NEW PROJECT, TAKING SHAPE</p><h2 id="campaign-modal-title">Create a campaign</h2></div><button className="icon-button subtle-icon" aria-label="Close create campaign form" onClick={() => setIsCampaignFormOpen(false)}><Icon name="close" /></button></div>
            <p className="modal-description">Start with the essentials. You can fill in the details as you go.</p>
            <form onSubmit={createCampaign}>
              <label className="form-field"><span>Campaign name <b>*</b></span><input name="title" autoFocus required placeholder="e.g. A little more daylight" /></label>
              <label className="form-field"><span>Client <b>*</b></span><input name="client" required placeholder="e.g. Sunday Supply Co." /></label>
              <label className="form-field"><span>Primary channel <b>*</b></span><select name="channel" required defaultValue=""><option value="" disabled>Choose a channel</option><option>Instagram</option><option>TikTok</option><option>Pinterest</option><option>Email</option><option>Instagram · Email</option><option>Multi-channel</option></select></label>
              {formFeedback && <p className="form-feedback" role="alert">{formFeedback}</p>}
              <div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setIsCampaignFormOpen(false)}>Cancel</button><button type="submit" className="button button-primary"><Icon name="plus" size={16} />Create campaign</button></div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, detail, icon, tone }: { label: string; value: number; detail: string; icon: IconName; tone: string }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon tone-${tone}`}><Icon name={icon} size={18} /></div>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value.toString().padStart(2, "0")}</strong>
      <span className="metric-detail">{detail}</span>
    </article>
  );
}

function CampaignProgress({ campaign }: { campaign: Campaign }) {
  return (
    <article className="campaign-progress-item">
      <span className={`campaign-dot tone-${campaign.color}`} />
      <div className="campaign-progress-main"><div className="campaign-progress-title"><strong>{campaign.title}</strong><span>{campaign.progress}%</span></div><div className="progress-track"><span style={{ width: `${campaign.progress}%` }} /></div><small>{campaign.client}</small></div>
      <StatusBadge status={campaign.status} />
    </article>
  );
}

function ContentArtwork({ item, large = false, compact = false }: { item: ContentItem; large?: boolean; compact?: boolean }) {
  return (
    <div className={`content-artwork artwork-${item.accent} artwork-${item.format} ${large ? "artwork-large" : ""} ${compact ? "artwork-compact" : ""}`}>
      <span className="artwork-kicker">{item.platform} / NOTES</span>
      <span className="artwork-leaf artwork-leaf-one" />
      <span className="artwork-leaf artwork-leaf-two" />
      <span className="artwork-sun" />
      <strong>{item.title}</strong>
      <span className="artwork-caption">a slower kind of lovely</span>
    </div>
  );
}
