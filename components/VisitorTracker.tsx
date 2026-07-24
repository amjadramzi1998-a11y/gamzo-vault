"use client";

import { useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { supabase } from "@/lib/supabase";

export default function VisitorTracker() {
  useEffect(() => {
    async function trackVisitor() {
      // لو الزيارة اتسجلت قبل كده في نفس الجلسة
      if (sessionStorage.getItem("visitor_tracked")) {
        return;
      }

      const fp = await FingerprintJS.load();
      const result = await fp.get();

      const visitorId = result.visitorId;

      // هل الجهاز اتسجل قبل كده؟
      const { data } = await supabase
        .from("visitors")
        .select("id")
        .eq("visitor_id", visitorId)
        .maybeSingle();

      if (!data) {
        await supabase.from("visitors").insert({
          visitor_id: visitorId,
          page: window.location.pathname,
        });
      }

      sessionStorage.setItem("visitor_tracked", "true");
    }

    trackVisitor();
  }, []);

  return null;
}