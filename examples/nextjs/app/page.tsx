"use client";

import { useMemo, useState } from "react";

type Ticket = {
  id: string;
  subject: string;
  requester: string;
  initials: string;
  status: "Open" | "Pending" | "Resolved";
  priority: "High" | "Medium" | "Low";
  channel: string;
  assignee: string;
  updated: string;
  tag: string;
};

const tickets: Ticket[] = [
  { id: "#4821", subject: "Unable to update billing address", requester: "Maya Chen", initials: "MC", status: "Open", priority: "High", channel: "Email", assignee: "You", updated: "8 min ago", tag: "Billing" },
  { id: "#4820", subject: "Export is stuck at 92%", requester: "Jordan Lee", initials: "JL", status: "Open", priority: "Medium", channel: "Chat", assignee: "Lena Ortiz", updated: "24 min ago", tag: "Technical" },
  { id: "#4819", subject: "Question about team permissions", requester: "Noah Williams", initials: "NW", status: "Pending", priority: "Low", channel: "Email", assignee: "You", updated: "1 hr ago", tag: "Account" },
  { id: "#4818", subject: "Duplicate charge on my invoice", requester: "Sofia Patel", initials: "SP", status: "Open", priority: "High", channel: "Email", assignee: "Marco Ruiz", updated: "2 hrs ago", tag: "Billing" },
  { id: "#4817", subject: "How do I add a new workspace?", requester: "Elliot Kim", initials: "EK", status: "Resolved", priority: "Low", channel: "Chat", assignee: "Lena Ortiz", updated: "Yesterday", tag: "Getting started" },
  { id: "#4816", subject: "Webhook delivery failing", requester: "Amara Okafor", initials: "AO", status: "Pending", priority: "High", channel: "API", assignee: "Marco Ruiz", updated: "Yesterday", tag: "Technical" },
];

const navItems = ["Inbox", "My tickets", "All tickets", "Reports"];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Inbox");
  const [filter, setFilter] = useState("All tickets");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("#4821");
  const [showComposer, setShowComposer] = useState(false);

  const visibleTickets = useMemo(() => tickets.filter((ticket) => {
    const matchesFilter = filter === "All tickets" || ticket.status === filter || (filter === "Assigned to me" && ticket.assignee === "You");
    const query = search.toLowerCase();
    return matchesFilter && (!query || `${ticket.subject} ${ticket.requester} ${ticket.id}`.toLowerCase().includes(query));
  }), [filter, search]);

  const selected = tickets.find((ticket) => ticket.id === selectedId) ?? tickets[0];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">S</span><span>Supportly</span></div>
        <div className="workspace-switcher"><span className="workspace-dot">A</span><span><b>Acme Inc.</b><small>Support workspace</small></span><span className="chevron">⌄</span></div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map((item, index) => <button key={item} className={activeNav === item ? "nav-item active" : "nav-item"} onClick={() => setActiveNav(item)}><span className="nav-icon">{["⌂", "▱", "▤", "◔"][index]}</span>{item}{item === "Inbox" && <span className="nav-count">12</span>}</button>)}
        </nav>
        <div className="sidebar-section"><span className="section-label">VIEWS</span><button className="subnav-item" onClick={() => setFilter("Assigned to me")}><span className="view-dot yellow" />Assigned to me<span className="view-count">4</span></button><button className="subnav-item" onClick={() => setFilter("High")}><span className="view-dot red" />High priority<span className="view-count">3</span></button><button className="subnav-item" onClick={() => setFilter("Pending")}><span className="view-dot purple" />Waiting on customer<span className="view-count">7</span></button></div>
        <div className="sidebar-bottom"><button className="subnav-item"><span className="nav-icon">⚙</span>Settings</button><div className="profile"><span className="avatar avatar-blue">JO</span><span><b>Jamie Oliver</b><small>Admin</small></span><span className="more">•••</span></div></div>
      </aside>

      <section className="content-area">
        <header className="topbar"><div><p className="eyebrow">MONDAY, OCTOBER 14, 2024</p><h1>{activeNav}</h1></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♢<span className="notification-dot" /></button><button className="help-button">?</button><button className="new-ticket" onClick={() => setShowComposer(true)}><span>＋</span> New ticket</button></div></header>
        <div className="toolbar"><div className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tickets" /><kbd>⌘ K</kbd></div><div className="toolbar-actions"><button className="filter-button" onClick={() => setFilter(filter === "All tickets" ? "Open" : "All tickets")}>≡ <span>{filter === "All tickets" ? "Filter" : filter}</span></button><button className="sort-button">Sort by <b>Last updated</b>⌄</button></div></div>
        <div className="ticket-layout"><section className="ticket-list"><div className="list-header"><span>{visibleTickets.length} tickets</span><button className="select-button">Select all　⌄</button></div>{visibleTickets.map((ticket) => <button key={ticket.id} className={selectedId === ticket.id ? "ticket-row selected" : "ticket-row"} onClick={() => setSelectedId(ticket.id)}><div className="row-top"><span className={`status ${ticket.status.toLowerCase()}`}><i />{ticket.status}</span><span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span><span className="ticket-id">{ticket.id}</span></div><h2>{ticket.subject}</h2><div className="row-bottom"><span className={`avatar avatar-${ticket.initials.toLowerCase()}`}>{ticket.initials}</span><span>{ticket.requester}</span><span className="row-divider" /> <span>{ticket.channel}</span><span className="updated">{ticket.updated}</span></div></button>)}</section>
          <aside className="detail-panel"><div className="detail-head"><span className="detail-label">TICKET {selected.id}</span><button className="more-button">•••</button></div><div className="detail-title"><h2>{selected.subject}</h2><button className="close-button">×</button></div><div className="detail-meta"><span className={`status ${selected.status.toLowerCase()}`}><i />{selected.status}</span><span className="meta-separator">•</span><span>Updated {selected.updated}</span></div><div className="conversation"><div className="message"><div className="message-author"><span className="avatar avatar-maya">MC</span><span><b>{selected.requester}</b><small>Today at 9:42 AM</small></span></div><p>Hi there, I&apos;m trying to update the billing address on our account but the save button just keeps spinning. I&apos;ve tried refreshing and using a different browser, but no luck. Could you take a look?</p></div><div className="message agent-message"><div className="message-author"><span className="avatar avatar-blue">JO</span><span><b>You</b><small>Today at 9:56 AM</small></span></div><p>Hi Maya, thanks for flagging this. I&apos;ll take a look at the account settings and get this sorted for you.</p></div></div><div className="reply-box"><textarea placeholder="Write a reply..." /><div className="reply-tools"><span>B</span><span><i>I</i></span><span>↗</span><span>⌘</span><button onClick={() => setShowComposer(true)}>Send reply</button></div></div></aside>
        </div>
      </section>
      {showComposer && <div className="modal-backdrop" onClick={() => setShowComposer(false)}><div className="composer-modal" onClick={(e) => e.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">CREATE TICKET</p><h2>New support ticket</h2></div><button className="close-button" onClick={() => setShowComposer(false)}>×</button></div><label>Requester<input placeholder="name@company.com" /></label><label>Subject<input placeholder="What can we help with?" /></label><label>Message<textarea placeholder="Describe the issue..." /></label><div className="modal-footer"><button className="cancel-button" onClick={() => setShowComposer(false)}>Cancel</button><button className="new-ticket" onClick={() => setShowComposer(false)}>Create ticket</button></div></div></div>}
    </main>
  );
}
