"use client";

import { useEffect } from 'react';

export function SecurityConsole() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Save original console methods we need for our warning
    const originalClear = console.clear;
    const originalLog = console.log;

    const blockConsole = () => {
      originalClear();
      originalLog("%cProject: Candidexa", "color: #4F46E5; font-size: 24px; font-weight: bold; font-family: sans-serif;");
      originalLog("%cSTOP!", "color: red; font-size: 40px; font-weight: bold; font-family: sans-serif; text-shadow: 1px 1px 0 #000;");
      originalLog("%cThe terminal must not be used while the execution of the program is going on.", "font-size: 16px; font-weight: bold; color: #333;");
      originalLog("%cAny input here will be ignored and deleted to protect your account.", "font-size: 14px; color: #666;");
    };

    blockConsole();

    // Continuously clear to delete user input
    const interval = setInterval(() => {
      blockConsole();
    }, 2000);

    // Overwrite standard console methods to prevent input/output evaluation logging
    const methods = ['log', 'warn', 'info', 'error', 'debug', 'dir', 'table', 'trace'];
    methods.forEach((method) => {
      // @ts-ignore
      console[method] = function () {};
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}
