import { LucideProps, UserPlus } from "lucide-react";

export const Icons = {
    Logo: (props: LucideProps) => (
        <svg {...props} width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
      </svg> 
    ),
    UserPlus
}

export type Icon = keyof typeof Icons