import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface Student {
    id: string;
    first_name: string;
    last_name: string;
    course_id?: string;
    course_name: string;
    date_of_birth: string | Date;
    gender: 'Male' | 'Female' | 'Other';
    email: string;
    phone_number: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string;
    is_international: boolean;
    status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
    intake: string | Date;
    created_at: string | Date;
    updated_at: string | Date;
}

interface Course {
    id: string;
    department: string;
    course_name: string;
    duration: string;
    total_credits: number;
    created_at: string | Date;
    updated_at: string | Date;
}