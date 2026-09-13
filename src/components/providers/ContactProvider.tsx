"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ContactDialog from "@/components/contact/ContactDialog";
import { lockScroll } from "@/components/providers/SmoothScroll";

type ContactContextValue = {
  open: boolean;
  openContact: () => void;
  closeContact: () => void;
};

const ContactContext = createContext<ContactContextValue>({
  open: false,
  openContact: () => {},
  closeContact: () => {},
});

/** Hook d'accès au formulaire de contact depuis n'importe quel CTA. */
export function useContactDialog() {
  return useContext(ContactContext);
}

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContact = useCallback(() => {
    setOpen(true);
    lockScroll(true);
  }, []);

  const closeContact = useCallback(() => {
    setOpen(false);
    lockScroll(false);
  }, []);

  const value = useMemo(
    () => ({ open, openContact, closeContact }),
    [open, openContact, closeContact],
  );

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactDialog open={open} onClose={closeContact} />
    </ContactContext.Provider>
  );
}
