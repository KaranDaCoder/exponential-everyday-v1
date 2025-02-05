import { Circle, CircleAlertIcon, DollarSign, Dumbbell, HeartHandshakeIcon, LightbulbIcon, NotebookPenIcon, Recycle, Waypoints } from "lucide-react";

export const categories = [
 {
  key: 'HEALTH_FITNESS',
  name: 'health and fitness',
  icon: <Dumbbell style={{ color: '#28A745' }} />,
  color: '#28A745',
  bgColor: 'bg-green-500', // Matches
  topBorder: 'border-green-500', // Added topBorder field
 },
 {
  key: 'PERSONAL_GROWTH',
  name: 'personal growth and learning',
  icon: <NotebookPenIcon style={{ color: '#FFB400' }} />,
  color: '#FFB400',
  bgColor: 'bg-yellow-500', // Matches
  topBorder: 'border-yellow-500', // Added topBorder field
 },
 {
  key: 'PRODUCTIVITY',
  name: 'productivity and work',
  icon: <LightbulbIcon style={{ color: '#007BFF' }} />,
  color: '#007BFF',
  bgColor: 'bg-blue-500', // Matches
  topBorder: 'border-blue-500', // Added topBorder field
 },
 {
  key: 'MENTAL_WELLBEING',
  name: 'mental and emotional wellbeing',
  icon: <HeartHandshakeIcon style={{ color: '#6F42C1' }} />,
  color: '#6F42C1',
  bgColor: 'bg-purple-600', // Adjusted
  topBorder: 'border-purple-600', // Added topBorder field
 },
 {
  key: 'RELATIONSHIPS',
  name: 'relationships and social connections',
  icon: <Waypoints style={{ color: '#E83E8C' }} />,
  color: '#E83E8C',
  bgColor: 'bg-pink-600', // Adjusted
  topBorder: 'border-pink-600', // Added topBorder field
 },
 {
  key: 'FINANCES',
  name: 'finances and money management',
  icon: <DollarSign style={{ color: '#FFC107' }} />,
  color: '#FFC107',
  bgColor: 'bg-yellow-500', // Adjusted
  topBorder: 'border-yellow-500', // Added topBorder field
 },
 {
  key: 'SUSTAINABILITY',
  name: 'sustainability and environment',
  icon: <Recycle style={{ color: '#20C997' }} />,
  color: '#20C997',
  bgColor: 'bg-stone-700', // Adjusted
  topBorder: 'border-stone-700', // Added topBorder field
 },
 {
  key: 'OTHER',
  name: 'other',
  icon: <CircleAlertIcon style={{ color: '#6C757D' }} size={20} />,
  color: '#6C757D',
  bgColor: 'bg-gray-500', // Matches
  topBorder: 'border-gray-500', // Added topBorder field
 },
];



export const reduceCategory = categories.reduce((acc, { key, name, icon, color, bgColor, topBorder }) => {
 acc[key] = { key, name, icon, color, bgColor, topBorder };
 return acc;
}, {});


export const strengths = [
 {
  key: 'CRAWLING',
  name: 'crawling',
  icon: '',
  color: ''
 },
 {
  key: 'WALKING',
  name: 'walking',
  icon: '',
  color: ''
 },
 {
  key: 'RUNNING',
  name: 'running',
  icon: '',
  color: ''
 },
 {
  key: 'SPRINTING',
  name: 'sprinting',
  icon: '',
  color: ''
 },
 {
  key: 'FLYING',
  name: 'flying',
  icon: '',
  color: ''
 },
];


export const reduceStrengths = strengths.reduce((acc, { key, name, icon, color, bgColor, topBorder }) => {
 acc[key] = { key, name, icon, color, bgColor, topBorder };
 return acc;
}, {});


export const statuses = [
 {
  key : 'ACTIVE',
  name : 'Active',
  color: '',
  bgColor: ''
 },
 {
  key : 'UPCOMING',
  name : 'Upcoming',
  color: '',
  bgColor: ''
 },
 {
  key : 'DISABLED',
  name : 'disabled',
  color: '',
  bgColor: ''
 },
]

export const reduceStatuses = statuses.reduce((acc, { key, name, color, bgColor }) => {
 acc[key] = { key, name, color, bgColor };
 return acc;
}, {});
