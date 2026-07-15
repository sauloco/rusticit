import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CalPrefill {
    name: string;
    email: string;
    notes: string;
}

// Inner component — only rendered once prefill data is available.
// The `key` on Cal forces a full remount (new iframe) if data ever changes.
function CalEmbed({ prefill }: { prefill: CalPrefill }) {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "20min" });
            cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
        })();
    }, []);

    return (
        <Cal
            key={`${prefill.email}::${prefill.name}`}
            namespace="20min"
            calLink="rusticit/20min"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
            config={{
                layout: "month_view",
                useSlotsViewOnSmallScreen: "true",
                name: prefill.name,
                email: prefill.email,
                notes: prefill.notes,
            }}
        />
    );
}

interface BookerIframeProps {
    targetId?: string;
}

export default function BookerIframe({ targetId }: BookerIframeProps) {
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const [prefill, setPrefill] = useState<CalPrefill | null>(() => {
        try {
            const stored = sessionStorage.getItem("cal_prefill");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        setTarget(targetId ? document.getElementById(targetId) : null);
    }, [targetId]);

    useEffect(() => {
        const handler = (e: Event) => {
            setPrefill((e as CustomEvent<CalPrefill>).detail);
        };
        window.addEventListener("rusticit:cal-prefill", handler);
        return () => window.removeEventListener("rusticit:cal-prefill", handler);
    }, []);

    if (!prefill) return null;

    const embed = <CalEmbed prefill={prefill} />;

    return target ? createPortal(embed, target) : embed;
}
