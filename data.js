// Dummy data (frontend only)
window.CYBER_DATA = {
  me: {
    name: "Farid P.",
    handle: "@blue.team.ops",
    avatar: "https://i.pravatar.cc/80?img=12",
    role: "SOC Analyst"
  },

  tags: [
    { key: "malware", color: "purple" },
    { key: "soc", color: "blue" },
    { key: "blue-team", color: "green" },
    { key: "threat-intel", color: "blue" },
    { key: "dfir", color: "purple" },
    { key: "cloudsec", color: "green" }
  ],

  stories: [
    { title: "SOC Shift", sub: "On-call", accent: "green" },
    { title: "Threat Map", sub: "Live", accent: "blue" },
    { title: "Malware Lab", sub: "RE notes", accent: "purple" },
    { title: "Patch Day", sub: "CVE triage", accent: "blue" },
    { title: "Hunt Ops", sub: "Signals", accent: "green" }
  ],

  trends: [
    { topic: "#threat-intel", meta: "12.4k posts • Campaign tracking" },
    { topic: "#malware", meta: "8.1k posts • New loader variants" },
    { topic: "#blue-team", meta: "6.7k posts • Detection ideas" },
    { topic: "#SOC", meta: "5.3k posts • Triage workflows" },
    { topic: "#CVE-2026-1xxx", meta: "2.9k posts • Hot discussion" }
  ],

  suggested: [
    { name: "Analyst_Nova", handle: "@nova.dfir", skill: "DFIR", online: true, avatar: "https://i.pravatar.cc/80?img=5" },
    { name: "RedTeamRook", handle: "@rook.red", skill: "Red Team", online: false, avatar: "https://i.pravatar.cc/80?img=32" },
    { name: "CloudSecLina", handle: "@lina.cloud", skill: "CloudSec", online: true, avatar: "https://i.pravatar.cc/80?img=44" }
  ],

  notifications: [
    { id: "n1", type: "like", icon: "fa-heart", accent: "green", text: "Analyst_Nova liked your post on YARA rule patterns.", time: "2m" },
    { id: "n2", type: "comment", icon: "fa-comment-dots", accent: "blue", text: "CloudSecLina commented: “Great IAM hardening checklist.”", time: "18m" },
    { id: "n3", type: "alert", icon: "fa-triangle-exclamation", accent: "purple", text: "Security alert: Suspicious link reported in #threat-intel. Stay cautious.", time: "1h" },
    { id: "n4", type: "mention", icon: "fa-at", accent: "blue", text: "You were mentioned in #SOC triage thread.", time: "3h" }
  ],

  posts: [
    {
      id: "p1",
      author: { name: "Farid P.", handle: "@blue.team.ops", avatar: "https://i.pravatar.cc/80?img=12" },
      time: "5m",
      text: "Quick win for noisy auth logs: bucket by src ASN + user-agent entropy. Catches credential stuffing bursts fast.",
      tags: ["soc", "blue-team", "threat-intel"],
      media: null,
      stats: { likes: 24, comments: 6, shares: 3 },
      liked: false
    },
    {
      id: "p2",
      author: { name: "Analyst_Nova", handle: "@nova.dfir", avatar: "https://i.pravatar.cc/80?img=5" },
      time: "22m",
      text: "DFIR note: for suspected PowerShell abuse, correlate ScriptBlockLogging with AMSI events + parent chain. Saves hours.",
      tags: ["dfir", "soc"],
      media: null,
      stats: { likes: 81, comments: 14, shares: 9 },
      liked: true
    },
    {
      id: "p3",
      author: { name: "CloudSecLina", handle: "@lina.cloud", avatar: "https://i.pravatar.cc/80?img=44" },
      time: "1h",
      text: "New cloud misconfig pattern I'm seeing: public bucket + overly broad presigned URL TTL. Lock that down.",
      tags: ["cloudsec", "blue-team"],
      media: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70",
      stats: { likes: 142, comments: 21, shares: 17 },
      liked: false
    },
    {
      id: "p4",
      author: { name: "MalwareKite", handle: "@kite.malware", avatar: "https://i.pravatar.cc/80?img=21" },
      time: "3h",
      text: "Sample looks like a loader w/ XOR+RC4 hybrid. Dropping a minimal YARA idea (tune in your environment): strings around 'GetProcAddress' + 'VirtualAlloc' + suspicious mutex format.",
      tags: ["malware", "threat-intel"],
      media: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=70",
      stats: { likes: 203, comments: 42, shares: 31 },
      liked: false
    }
  ],

  chats: [
    {
      id: "c1",
      contact: { name: "Analyst_Nova", handle: "@nova.dfir", avatar: "https://i.pravatar.cc/80?img=5", online: true, subtitle: "Online • DFIR" },
      messages: [
        { from: "them", text: "Got a minute to review this triage workflow?", time: "09:18" },
        { from: "me", text: "Yeah. Paste the steps — I’ll suggest what to automate.", time: "09:19" },
        { from: "them", text: "We’re using SIEM → enrich → case. Want to add ASN + geo + device fingerprint early.", time: "09:21" }
      ]
    },
    {
      id: "c2",
      contact: { name: "CloudSecLina", handle: "@lina.cloud", avatar: "https://i.pravatar.cc/80?img=44", online: true, subtitle: "Online • CloudSec" },
      messages: [
        { from: "them", text: "That presigned URL note is trending. Want to co-write a checklist?", time: "11:05" },
        { from: "me", text: "Absolutely. Let’s do short bullets and examples.", time: "11:06" }
      ]
    },
    {
      id: "c3",
      contact: { name: "RedTeamRook", handle: "@rook.red", avatar: "https://i.pravatar.cc/80?img=32", online: false, subtitle: "Offline • Red Team" },
      messages: [
        { from: "them", text: "Nice detection idea. Mind if I try to bypass it and report back?", time: "Yesterday" },
        { from: "me", text: "Please do — would love the adversary view.", time: "Yesterday" }
      ]
    }
  ]
};