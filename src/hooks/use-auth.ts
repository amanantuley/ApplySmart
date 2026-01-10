"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/firebase/auth";

export const useAuth = () => {
  return useContext(AuthContext);
};
