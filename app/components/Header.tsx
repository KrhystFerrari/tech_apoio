"use client";

import { motion } from "framer-motion";
import {
  Home,
  Book,
  Calculator,
  Computer,
  Microscope,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Início",
    href: "/inicio",
    icon: Home,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Computer,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  {
    name: "Português",
    href: "/jogos/portugues",
    icon: Book,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    name: "Matemática",
    href: "/jogos/matematica",
    icon: Calculator,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    name: "Tecnologia",
    href: "/jogos/tecnologia",
    icon: Computer,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    name: "Ciências",
    href: "/jogos/ciencias",
    icon: Microscope,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      className="bg-white shadow-kid-lg border-b-4 border-accent-300 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/inicio" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-kid flex items-center justify-center shadow-kid">
                <Computer className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-fun rainbow-text">TechApoio</h1>
                <p className="text-sm text-gray-600 font-kid">
                  Aprender é divertido!
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-kid transition-all duration-300 hover:shadow-kid group",
                      isActive
                        ? `${item.bgColor} ${item.color} shadow-kid scale-105`
                        : "hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-6 h-6 mb-1 transition-transform duration-300 group-hover:scale-110",
                        isActive ? item.color : "text-gray-500"
                      )}
                    />
                    <span className="text-xs font-kid font-semibold">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Botões de Ação */}
          <div className="flex items-center space-x-3">
            {/* Botão Professor */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/professor"
                className="hidden md:flex items-center space-x-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-kid hover:bg-orange-200 transition-colors duration-300 font-kid font-semibold"
              >
                <Users className="w-5 h-5" />
                <span>Professor</span>
              </Link>
            </motion.div>

            {/* Botão Configurações */}
            <motion.button
              className="p-3 bg-gray-100 text-gray-600 rounded-kid hover:bg-gray-200 hover:text-gray-800 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Navegação Mobile */}
        <div className="lg:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {navigationItems.slice(0, 6).map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-kid transition-all duration-300 hover:shadow-kid",
                      isActive
                        ? `${item.bgColor} ${item.color} shadow-kid scale-105`
                        : "hover:bg-gray-50 text-gray-600"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 mb-1",
                        isActive ? item.color : "text-gray-500"
                      )}
                    />
                    <span className="text-xs font-kid font-semibold text-center">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
