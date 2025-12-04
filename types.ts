
import { ReactNode } from "react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string; // Using gradient strings for this demo
  problem: string;
  solution: string;
  impact: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}
