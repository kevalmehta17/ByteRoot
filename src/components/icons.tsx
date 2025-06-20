import type { LucideProps } from "lucide-react";
import {
  Home,
  FileText,
  Image,
  MessageSquareText,
  BookText,
  Hospital,
  CalendarDays, // Ensured import
  Bell,
  ShieldCheck,
  HeartPulse,
  Settings,
  LogOut,
  UserCircle,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  UploadCloud,
  Search,
  AlertTriangle,
  LifeBuoy,
  Languages,
  ClipboardList,
  Microscope,
  Stethoscope,
  Download,
  Trash2,
  Loader2,
  Phone,
  Clock,
  MapPin,
  SendHorizonal as Send,
  Star,
  ChevronLeft,
  FilePlus2,
  Sun,
  Moon,
  Tablet,
} from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
      <line x1="12" y1="22" x2="12" y2="12.5"></line>
      <line x1="10" y1="18.5" x2="10" y2="15.5"></line>
      <line x1="14" y1="18.5" x2="14" y2="15.5"></line>
      <line x1="8" y1="17" x2="8" y2="14"></line>
      <line x1="16" y1="17" x2="16" y2="14"></line>
    </svg>
  ),
  home: Home,
  file: FileText,
  imageDiagnosis: Image,
  symptomChecker: MessageSquareText,
  reportSimplifier: BookText,
  hospitals: Hospital,
  appointments: CalendarDays,
  notifications: Bell,
  emergency: AlertTriangle,
  settings: Settings,
  logout: LogOut,
  user: UserCircle,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  add: PlusCircle,
  upload: UploadCloud,
  search: Search,
  alertTriangle: AlertTriangle,
  security: ShieldCheck,
  translate: Languages,
  records: ClipboardList,
  analysis: Microscope,
  diagnosis: Stethoscope,
  heartPulse: HeartPulse,
  pills: (props: LucideProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 8.5v7h7v-7h-7z" />
      <path d="M10.5 12.5v-3h3v3" />
      <path d="M19.5 12.5h-5v5h-5v-5h-5v-5h5v-5h5v5h5z" />
    </svg>
  ),
  tablet: Tablet,
  filePdf: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10 12v6H9" />
      <path d="M11 18h2a1 1 0 0 0 0-2h-2v-2h2a1 1 0 0 0 0-2h-2V9.5a1.5 1.5 0 0 1 3 0v1" />
    </svg>
  ),
  fileImage: Image,
  fileWord: FileText,
  download: Download,
  trash: Trash2,
  loader: Loader2,
  phone: Phone,
  clock: Clock,
  mapPin: MapPin,
  send: Send,
  star: Star,
  tooth: (props: LucideProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 4c-2.6 0-4.8 2.2-4.8 4.8S9.4 16 12 16s4.8-2.2 4.8-4.8S14.6 6 12 6zm0 7.2c-1.3 0-2.4-.9-2.4-2.1s1.1-2.1 2.4-2.1 2.4.9 2.4 2.1-1.1 2.1-2.4 2.1zM7.2 18.4c.3 1 .9 1.8 1.7 2.4.8.6 1.8.9 2.9.9s2.1-.3 2.9-.9c.8-.6 1.4-1.4 1.7-2.4h-9.2z" />
    </svg>
  ),
  bone: (props: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.5 4.5a2.5 2.5 0 0 1 0 5H16v5l-2.1 2.1a2.5 2.5 0 0 1-3.5 0L8 14.5V9.5H5.5a2.5 2.5 0 0 1 0-5C8.5 4.5 10 3 12 3s3.5 1.5 3.5 1.5S18.5 4.5 18.5 4.5Z" />
      <path d="M5.5 19.5a2.5 2.5 0 0 0 0-5H8V9.5l2.5-2.5a2.5 2.5 0 0 1 3.5 0L16 9.5V14.5h2.5a2.5 2.5 0 0 0 0-5c-3 0-4.5 1.5-4.5 1.5S8.5 19.5 5.5 19.5Z" />
    </svg>
  ),
  filePlus: FilePlus2,
  sun: Sun,
  moon: Moon,
  shieldCheck: ShieldCheck,
  calendarDays: CalendarDays, // Ensured definition
};

export type IconKey = keyof typeof Icons;
