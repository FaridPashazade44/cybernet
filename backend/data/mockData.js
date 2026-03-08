const bcrypt = require('bcryptjs');

const users = [
  {
    id: 'u1',
    name: 'Farid P.',
    handle: '@blue.team.ops',
    role: 'SOC Analyst',
    avatar: 'https://i.pravatar.cc/80?img=12',
    email: 'farid@cybernet.local',
    passwordHash: bcrypt.hashSync('Passw0rd!', 10),
  },
  {
    id: 'u2',
    name: 'Analyst_Nova',
    handle: '@nova.dfir',
    role: 'DFIR',
    avatar: 'https://i.pravatar.cc/80?img=5',
    email: 'nova@cybernet.local',
    passwordHash: bcrypt.hashSync('Passw0rd!', 10),
  },
  {
    id: 'u3',
    name: 'CloudSecLina',
    handle: '@lina.cloud',
    role: 'CloudSec',
    avatar: 'https://i.pravatar.cc/80?img=44',
    email: 'lina@cybernet.local',
    passwordHash: bcrypt.hashSync('Passw0rd!', 10),
  },
];

const posts = [
  {
    id: 'p1',
    authorId: 'u1',
    time: '5m',
    text: 'Quick win for noisy auth logs: bucket by src ASN + user-agent entropy.',
    tags: ['soc', 'threat-intel'],
    media: null,
    stats: { likes: 58, comments: 13, shares: 9 },
    likedBy: [],
  },
  {
    id: 'p2',
    authorId: 'u3',
    time: '1h',
    text: 'Public bucket + wide presigned URL TTL is still a common cloud anti-pattern.',
    tags: ['cloudsec', 'blue-team'],
    media:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70',
    stats: { likes: 142, comments: 21, shares: 17 },
    likedBy: [],
  },
];

const notifications = [
  {
    id: 'n1',
    userId: 'u1',
    type: 'like',
    text: 'Analyst_Nova liked your post on YARA rule patterns.',
    time: '2m',
    read: false,
  },
  {
    id: 'n2',
    userId: 'u1',
    type: 'comment',
    text: 'CloudSecLina commented: “Great IAM hardening checklist.”',
    time: '18m',
    read: false,
  },
];

const chats = [
  {
    id: 'c1',
    memberIds: ['u1', 'u2'],
    messages: [
      { id: 'm1', from: 'u2', text: 'Got a minute to review this triage workflow?', time: '09:18' },
      { id: 'm2', from: 'u1', text: 'Yeah. Paste the steps — I’ll suggest what to automate.', time: '09:19' },
    ],
  },
  {
    id: 'c2',
    memberIds: ['u1', 'u3'],
    messages: [
      { id: 'm3', from: 'u3', text: 'Want to co-write a cloud checklist?', time: '11:05' },
    ],
  },
];

module.exports = { users, posts, notifications, chats };
