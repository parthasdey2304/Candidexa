"use client";

import { useEffect } from 'react';

export function SecurityConsole() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const asciiArt = `
   ____                 _ _     _                  
  / ___|__ _ _ __   __| (_) __| | _____  ____ _ 
 | |   / _\` | '_ \\ / _\` | |/ _\` |/ _ \\ \\/ / _\` |
 | |__| (_| | | | | (_| | | (_| |  __/>  < (_| |
  \\____\\__,_|_| |_|\\__,_|_|\\__,_|\\___/_/\\_\\__,_|
`;

    // Wait a brief moment to ensure it prints after Next.js initial dev logs
    setTimeout(() => {
      // Save original console methods if we want to log but prevent others from logging later
      const originalLog = console.log;
      
      originalLog("%c" + asciiArt, "color: #4F46E5; font-weight: bold; font-family: monospace;");
      originalLog("%cSTOP!", "color: red; font-size: 40px; font-weight: bold; font-family: sans-serif; text-shadow: 1px 1px 0 #000;");
      originalLog("%cThe terminal must not be used while the execution of the program is going on.", "font-size: 16px; font-weight: bold; color: #333;");
      originalLog("%cAny input here will be ignored and deleted to protect your account.", "font-size: 14px; color: #666;");

      // Overwrite standard console methods to prevent input/output evaluation logging
      // This stops terminal commands from being useful
      const methods = ['log', 'warn', 'info', 'error', 'debug', 'dir', 'table', 'trace'];
      methods.forEach((method) => {
        // @ts-ignore
        console[method] = function () {};
      });
    }, 1000);

  }, []);

  return null;
}
