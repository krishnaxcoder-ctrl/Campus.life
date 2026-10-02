// Content shown in the reference screenshots.
import type { Img } from '@/constants/cl-assets';

export type UserId = 'khalander' | 'sanjan' | 'srujan' | 'shaikh';

export type Person = {
  name: string;
  district?: string;
  avatar: keyof typeof Img; // small avatar in the feed
  photo: keyof typeof Img; // large avatar on the profile page
};

export const USERS: Record<UserId, Person> = {
  khalander: {
    name: 'Khalander Afeel Hussain',
    district: 'Dakshina Kannada,Karnataka',
    avatar: 'avatarPlaceholder',
    photo: 'avatarImagePlaceholder',
  },
  sanjan: { name: 'SANJAN R', avatar: 'avatarSanjan', photo: 'avatarSanjanLarge' },
  srujan: {
    name: 'B Srujan Acharya',
    district: 'Dakshina Kannada,Karnataka',
    avatar: 'avatarPlaceholder',
    photo: 'avatarImagePlaceholder',
  },
  shaikh: { name: 'Shaikh Mohammad Uzaifat Hassan Abbas', avatar: 'avatarPlaceholder', photo: 'avatarImagePlaceholder' },
};

/** Photo or video picked on the Upload screen. */
export type PickedMedia = { uri: string; type: 'image' | 'video'; width: number; height: number };

export type Post = {
  id: string;
  // A person from the screenshots, or the author of a post written in this session.
  user: UserId | Person;
  activity: string;
  date: string;
  body: string;
  // Photo crops from the screenshots; the "1/8"-style counter is part of the image.
  photo?: 'postBeach' | 'postBeach2' | 'postBeach3' | 'postBeach4' | 'postBeach5';
  media?: PickedMedia;
  // Body longer than 2 lines: shows the expand chevron.
  long?: boolean;
};

export const POSTS: Post[] = [
  {
    id: 'p1',
    user: 'khalander',
    activity: 'Panambur Beach Cleaning',
    date: '27 Sep 2026 05:17 PM',
    body:
      '“Participated in a beach cleaning activity by collecting plastic waste, bottles, and other litter from the beach. The activity helped keep the beach clean and created awareness about protecting our coastline.”',
    photo: 'postBeach',
    long: true,
  },
  {
    id: 'p2',
    user: 'khalander',
    activity: 'Beach cleaning at Panambur beach',
    date: '27 Sep 2026 11:20 AM',
    body: 'Had a very nice experience to contribute to the happy environment',
    photo: 'postBeach2',
  },
  {
    id: 'p3',
    user: 'sanjan',
    activity: 'Beach cleaning @panambur',
    date: '27 Sep 2026 11:18 AM',
    body: 'Today we conducted a beach cleanup, taking on everything from the high-tide line to the boardwalk.',
    photo: 'postBeach3',
  },
  {
    id: 'p4',
    user: 'srujan',
    activity: 'Beach cleaning',
    date: '27 Sep 2026 11:18 AM',
    body: 'It was was nice experience and done the cleaning successfully',
    photo: 'postBeach4',
  },
];

export type CampusTile = { id: string; name: string; image: keyof typeof Img.tiles };

export const CAMPUS_TILES: CampusTile[] = [
  { id: 'zap', name: 'Zap Internship League', image: 'zap' },
  { id: 'siu', name: 'Sricity International University', image: 'sricityUniversity' },
  { id: 'sricity', name: 'SriCity Where Global Enterprises Thrive', image: 'sricity' },
  { id: 'vtu', name: 'VTU Visvesvaraya Technological University', image: 'vtu' },
  { id: 'word', name: 'Word Games', image: 'wordGames' },
];

export const INSTITUTE = 'A.J. INSTITUTE OF ENGINEERING AND TECHNOLOGY MANGALURU';

export const CATEGORIES = [
  'All Categories',
  'Assisting rural product marketing',
  'Contributing To National Initiatives Such As Digital India, Skill India, Swachh Bharat Internship',
  'Creating actionable business proposals to enhance village income',
  'Developing Sustainable Water Management Systems',
  'Facilitating 100% Digitized Money Transactions',
  'Food Preservation/Packaging',
  'Helping Schools Improve Academic Outcomes',
  'Managing and developing garbage disposal systems',
  'Promotion of appropriate technologies',
  'Rainwater Harvesting Awareness Programs In Rural/ Urban Areas',
  'Reduction of energy consumption',
  'Spreading Rural Awareness Through Outreach Programs',
  'Tourism Promotion And Innovative Approaches',
  'Training Rural Populations ("To Skill Rural Population")',
  'Women empowerment clubs - leadership & awareness programs',
];

export type EventItem = {
  id: string;
  category: string;
  title: string;
  starts: string;
  ends: string;
  description: string;
  status: 'Active' | 'Upcoming';
};

export const CURRENT_EVENTS: EventItem[] = [
  {
    id: 'e1',
    category: 'Helping Schools Improve Academic Outcomes',
    title:
      'Activity:Helping Local Schools To Achieve Good Result And Enhance Their Enrolment In Higher/Technical/ Vocational Education.',
    starts: '21 Aug 2026 • 08:30',
    ends: '31 Oct 2026 • 17:00',
    description:
      'Activity:Helping local schools to achieve good result and enhance their enrolment in Higher/technical/ Vocational education.',
    status: 'Active',
  },
  {
    id: 'e2',
    category: 'Helping Schools Improve Academic Outcomes',
    title: 'Helping School_Aids_29/08/2026',
    starts: '29 Aug 2026 • 10:45',
    ends: '31 Oct 2026 • 17:00',
    description: 'Helping School_aids_29/08/2026',
    status: 'Active',
  },
  {
    id: 'e3',
    category: 'Facilitating 100% Digitized Money Transactions',
    title: 'Digital Transaction_Aids_02/09/26',
    starts: '02 Sept 2026 • 09:30',
    ends: '31 Oct 2026 • 17:00',
    description: 'DIGITAL TRANSACTION_AIDS_02/09/26',
    status: 'Active',
  },
  {
    id: 'e4',
    category: 'Training Rural Populations ("To Skill Rural Population")',
    title: 'Skill Rural Poplation_03/09/2026',
    starts: '04 Sept 2026 • 08:00',
    ends: '31 Dec 2026 • 17:00',
    description: 'Skill Rural Poplation_03/09/2026',
    status: 'Active',
  },
  {
    id: 'e5',
    category: 'Training Rural Populations ("To Skill Rural Population")',
    title: 'Rural Awareness_03/09/26_Madyar',
    starts: '04 Sept 2026 • 08:00',
    ends: '31 Dec 2026 • 17:00',
    description: 'Rural Awareness_03/09/26_Madyar',
    status: 'Active',
  },
];

export const CURRENT_TOTAL = 49;

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'u1',
    category: 'Helping Schools Improve Academic Outcomes',
    title: 'Awareness In School',
    starts: '03 Oct 2026 • 08:00',
    ends: '03 Oct 2026 • 18:30',
    description: 'Awareness Program',
    status: 'Upcoming',
  },
];

export type MyEvent = {
  id: string;
  title: string;
  status: 'Active' | 'Upcoming';
  category: string;
  institute: string;
  starts: string;
  ends: string;
  about: string;
  location: string;
  address: string;
  contact: string;
  phone: string;
  email: string;
};

// Event Info as shown for the first event. The screenshots only show the details of this one,
// so the other events reuse its values with their own title.
const PANAMBUR: Omit<MyEvent, 'id' | 'title' | 'about'> = {
  status: 'Active',
  category: 'Contributing to national initiatives such as Digital India, Skill India, Swachh Bharat Internship',
  institute: 'A.j. Institute Of Engineering And Technology Mangaluru',
  starts: '27-09-2026 07:00:00',
  ends: '03-01-2027 17:00:00',
  location: 'panambur beach',
  address: 'panambur beach',
  contact: '9353194826',
  phone: '9353194826',
  email: 'divyar@ajiet.edu.in',
};

const myEvent = (id: string, title: string): MyEvent => ({ ...PANAMBUR, id, title, about: title.toLowerCase() });

// Same order as Img.myEvents / Img.myEventHeroes.
export const MY_EVENTS: MyEvent[] = [
  myEvent('1', 'Swach Bharat_Panambur_26/09/26'),
  myEvent('2', 'Swach Bharat_Panambur_29/06/26'),
  myEvent('3', 'Swach Bharat_Aids 2Nd Year_Beach Cleaning _Nitk'),
  myEvent('4', 'Beach Cleaning_Aids'),
  myEvent('5', 'Swach Bharat_Aids'),
];

/** Event for a `[id]` route param, with its index into Img.myEvents / Img.myEventHeroes. */
export function findMyEvent(id: string | undefined) {
  const index = Math.max(0, MY_EVENTS.findIndex((e) => e.id === id));
  return { event: MY_EVENTS[index], index };
}

// "View Posts" of the first event: one more post on top of the feed posts. Total in the app was 6/6;
// the sixth post wasn't visible in the screenshots.
export const EVENT_POSTS: Record<string, Post[]> = {
  '1': [
    {
      id: 'p0',
      user: 'shaikh',
      activity: 'Beach cleaning',
      date: '27 Sep 2026 05:44 PM',
      body: 'We were cleaning the beach',
      photo: 'postBeach5',
    },
    ...POSTS,
  ],
};

export const PEOPLE = [
  'ABDUL FATHAH', 'Abhay RajB', 'ABHINAND K', 'ABHISHEK GR', 'ABHISHEK P', 'AFTAB HUSSAINSHAIK',
  'AINAM MANSIA', 'AISHWARYA AMESTHA', 'AJITH S', 'AMAL TJ', 'AMEEN AHZAN', 'ANANYA', 'CHAITHANYA',
  'GAGAN MSUVARNA', 'GOWRAV RAJ', 'HARSHA SRAO', 'JEEVITHA HR', 'KEERTHANA', 'LAHARI KIRAN', 'MANVITH',
  'MANVITHA KARKERA', 'Manvitha YB', 'MOHAMED ZEHAANSULTAN', 'MOHAMMED FAWAZ', 'MOHAMMED RANEEMPR',
  'MOHAMMED TAHSIN', 'MOHAMMED YANNISAP', 'NISHITA SHEKHARPOOJARY', 'NISHITHA NR', 'PRANAV G',
  'PRAVEETH PBHANDARY', 'PREKSHA', 'PREKSHA MPOOJARI', 'PUNITH RAOMOHRER', 'RESHMA AH', 'RITHVIK POOJARY',
  'RIYA MATHEW',
];

// Values shown on the Edit Profile screen. Name and member ID come from the profile (see data/user.ts).
export const EDIT_PROFILE = {
  mobile: '9967180937',
  email: 'krishnaphatkure0@gmail.com',
  organization: '',
  dob: '2026-03-14',
  gender: 'Male',
  height: '',
  weight: '',
  country: 'India',
  state: 'Karnataka',
  city: 'Dakshina Kannada',
};

// Answers are placeholders written from the in-app instructions; the screenshots only show questions.
export const FAQS = [
  {
    q: 'What are the important guidelines for check-in, check-out, and volunteering hours?',
    a: 'Check in only when you reach the event location and check out as soon as the activity ends. Hours are calculated from your check-in and check-out time, so always complete both for every session.',
  },
  {
    q: 'I am not able to receive the OTP. what should I do ?',
    a: 'Make sure your mobile number is correct and has network coverage, wait a minute and tap resend. If the problem continues, contact your college coordinator.',
  },
  {
    q: 'Which mobile number will I receive the OTP on?',
    a: 'The OTP is sent to the mobile number registered with your college for Campus.Life.',
  },
  {
    q: 'What should I do if the VTU tile is not visible in Campus.Life?',
    a: 'Use the join code shared by your college on the Home screen. If the tile is still not visible, contact your college coordinator.',
  },
  {
    q: 'How can I join an event?',
    a: 'Open the VTU tile from My Campus, go to Events, choose an event and tap View Details to join it.',
  },
  {
    q: 'Where can I view my volunteering records?',
    a: 'Open the VTU tile from My Campus and tap My Volunteering Journey to see your check-ins and total hours.',
  },
  {
    q: 'How do I check in and check out for an event?',
    a: 'Open the event from My Events and use the check-in button when you start and the check-out button when you finish.',
  },
  {
    q: 'Is it mandatory to upload photos or videos for volunteering activities?',
    a: 'Yes, upload photos or videos of your activity as proof so that your coordinator can validate it.',
  },
];
