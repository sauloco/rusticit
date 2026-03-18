import {getStore} from "@netlify/blobs";

const PRIVATE_IP_RE =
    /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)|^::1$|^::ffff:(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/;

async function getGeo(ip) {
    if (!ip || PRIVATE_IP_RE.test(ip)) return null;
    try {
        const res = await fetch(`https://ip-api.com/json/${ip}?fields=city,country`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.city && data.country ? data : null;
    } catch {
        return null;
    }
}

async function postToWebhook(webhookUrl, body) {
    const res = await fetch(`${webhookUrl}?wait=true`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Webhook POST failed: ${res.status} — ${text}`);
    }
    return res.json();
}

async function postToThread(webhookUrl, threadId, content) {
    const res = await fetch(`${webhookUrl}?thread_id=${threadId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({content}),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Thread POST failed: ${res.status} — ${text}`);
    }
}

function inferSummary(components, botDetection, visitorStatus, previousThreadId) {
    const c = components || {};
    const lines = [];

    // --- Bot detection ---
    if (botDetection) {
        const isBot = botDetection.bot;
        const kind = botDetection.botKind ? ` (${botDetection.botKind})` : "";
        lines.push(`Bot detection: ${isBot ? `🤖 bot detected${kind}` : "✅ human"}`);
    }

    // --- Device ---
    const platform = String(c.platform || "").toLowerCase();
    const rendererUnmasked = String(c.webGlBasics?.rendererUnmasked || "").toLowerCase();
    const vendorUnmasked = String(c.webGlBasics?.vendorUnmasked || "").toLowerCase();
    const touch = c.touchSupport || {};
    const hasTouch = touch.maxTouchPoints > 0 || touch.touchEvent || touch.touchStart;

    let device = "unknown";
    if (/iphone/.test(platform)) device = "iPhone";
    else if (/ipad/.test(platform)) device = "iPad";
    else if (/android/.test(platform) || /android/.test(rendererUnmasked)) device = "Android device";
    else if (/mac/.test(platform) || /apple/.test(rendererUnmasked) || /apple/.test(vendorUnmasked)) device = "Mac";
    else if (/win/.test(platform)) device = "Windows PC";
    else if (/linux/.test(platform)) device = "Linux machine";
    else if (hasTouch) device = "mobile device";
    lines.push(`Likely device: ${device}`);

    // --- Chip/GPU ---
    const rawRenderer = String(c.webGlBasics?.rendererUnmasked || "");
    const rawVendor = String(c.webGlBasics?.vendorUnmasked || "");
    let gpu = "unknown";
    const appleMatch = rawRenderer.match(/Apple M(\d+)\s*(Pro|Max|Ultra)?/i);
    if (appleMatch) {
        const variant = appleMatch[2] ? `, very likely M${appleMatch[1]} ${appleMatch[2]}` : `, very likely M${appleMatch[1]}`;
        gpu = `Apple Silicon${variant}`;
    } else if (/apple/i.test(rawVendor) || /apple/i.test(rawRenderer)) {
        gpu = "Apple Silicon";
    } else if (/nvidia/i.test(rawRenderer)) {
        const model = rawRenderer.replace(/.*?NVIDIA\s*/i, "").split("/")[0].trim();
        gpu = model ? `NVIDIA, likely ${model}` : "NVIDIA GPU";
    } else if (/amd|radeon/i.test(rawRenderer)) {
        gpu = "AMD GPU";
    } else if (/intel/i.test(rawRenderer) || /intel/i.test(rawVendor)) {
        gpu = "Intel GPU";
    }
    lines.push(`Likely chip/GPU: ${gpu}`);

    // --- Browser family ---
    const vendorFlavors = Array.isArray(c.vendorFlavors) ? c.vendorFlavors : [];
    const browserVendor = String(c.vendor || "").toLowerCase();
    let browser = "unknown";
    if (vendorFlavors.some((f) => /^chrome$|^chromium$/i.test(f))) browser = "Chrome/Chromium";
    else if (vendorFlavors.some((f) => /^safari$/i.test(f)) || /apple/i.test(browserVendor)) browser = "Safari/WebKit";
    else if (vendorFlavors.some((f) => /^firefox$/i.test(f))) browser = "Firefox";
    else if (/google/i.test(browserVendor)) browser = "Chromium-based browser";
    lines.push(`Likely browser family: ${browser}`);

    // --- Locale ---
    const languages = c.languages;
    let locale = "unknown";
    if (Array.isArray(languages) && languages.length > 0) {
        const firstLang = Array.isArray(languages[0]) ? languages[0][0] : languages[0];
        if (firstLang) {
            try {
                const [langCode, region] = firstLang.split("-");
                const langName = new Intl.DisplayNames(["en"], {type: "language"}).of(langCode);
                locale = region ? `browser in ${langName} (${region})` : `browser in ${langName}`;
                if (languages.flat().length > 1) locale += " + others";
            } catch {
                locale = firstLang;
            }
        }
    }
    lines.push(`Locale config: ${locale}`);

    // --- Timezone ---
    lines.push(`Timezone config: ${c.timezone || "unknown"}`);

    // --- Display ---
    const res = c.screenResolution;
    const display = Array.isArray(res) && res.length >= 2 ? `${res[0]}×${res[1]}` : "unknown";
    lines.push(`Display context: ${display}`);

    // --- Touch ---
    lines.push(`Touch: ${hasTouch ? "yes" : "no"}`);

    // --- Storage ---
    const storageList = [];
    if (c.localStorage) storageList.push("localStorage");
    if (c.sessionStorage) storageList.push("sessionStorage");
    if (c.indexedDB) storageList.push("indexedDB");
    const storage =
        storageList.length === 0
            ? "restricted"
            : storageList.length === 3
                ? `normal (${storageList.join(", ")})`
                : storageList.join(", ");
    lines.push(`Storage support: ${storage}`);

    // --- Color ---
    let color = "unknown";
    const gamut = c.colorGamut;
    if (gamut === "rec2020") color = "wide color (rec2020)";
    else if (gamut === "p3") color = "wide color (p3)";
    else if (gamut === "srgb") color = "standard color (sRGB)";
    lines.push(`Color: ${color}`);

    // --- PDF ---
    lines.push(`PDF support: ${c.pdfViewerEnabled ? "yes" : "no"}`);

    // --- Visitor status ---
    lines.push(`Visitor status: ${visitorStatus}`);
    const prevThread = previousThreadId
        ? `https://discord.com/channels/739837377614184489/${previousThreadId}`
        : "none";
    lines.push(`Previous Discord thread: ${prevThread}`);

    return lines.join("\n");
}

export default async function handler(req, context) {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", {status: 405});
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        return new Response("Missing env vars", {status: 500});
    }

    let body;
    try {
        body = await req.json();
    } catch {
        return new Response("Bad Request", {status: 400});
    }

    const {type} = body;

    if (type === "thread") {
        const {threadId, content} = body;
        if (!threadId || !content) return new Response("Bad Request", {status: 400});
        await postToThread(webhookUrl, threadId, content);
        return new Response(null, {status: 204});
    }

    if (type === "visit") {
        const {visitorId, page, referrer, components, botDetection, tracking} = body;

        const ip =
            req.headers.get("cf-connecting-ip") ||
            req.headers.get("x-nf-client-connection-ip") ||
            "";

        const allowLocalhost = process.env.ALLOW_LOCALHOST_ANALYTICS === "true";
        if (!allowLocalhost && (PRIVATE_IP_RE.test(ip) || !ip)) {
            return Response.json({threadId: null});
        }

        // --- Visitor persistence ---
        let visitorRecord = null;
        let previousThreadId = null;
        let visitorStatus = "new";

        if (visitorId) {
            try {
                const store = getStore("visitors");
                visitorRecord = await store.get(visitorId, {type: "json"});
                if (visitorRecord) {
                    visitorStatus = "returning";
                    const sessions = visitorRecord.sessions || [];
                    previousThreadId = sessions.at(-1)?.discord_thread_id || null;
                }
            } catch {
                // non-critical — treat as new visitor
            }
        }

        // --- Geo + inference ---
        const geo = await getGeo(ip);
        const location = geo ? `${geo.city}, ${geo.country}` : "Unknown location";
        const shortId = visitorId ? visitorId.slice(0, 8) : "????????";
        const summary = inferSummary(components, botDetection, visitorStatus, previousThreadId);

        // --- Discord message ---
        const header = [
            `Location | IP: **${location}** | \`${ip}\``,
            `ID: \`${shortId}\``,
            `Start page: \`${page || "Homepage"}\``,
        ];
        if (referrer) header.push(`🔗 ${referrer}`);
        if (tracking && Object.keys(tracking).length > 0) {
            const trackingLines = Object.entries(tracking).map(([k, v]) => `  ${k}: ${v}`).join("\n");
            header.push(`\n🔖 **Tracked link**\n${trackingLines}`);
        }
        header.push("");
        header.push(summary);

        const humanLabel = botDetection?.bot ? "Bot" : "Human";
        const returningLabel = visitorStatus === "returning" ? "Returning" : "First Time";
        const locationSuffix = location !== "Unknown location" ? ` — ${location}` : "";
        const threadName = `${humanLabel} · ${returningLabel} · ${shortId}${locationSuffix}`;
        const message = await postToWebhook(webhookUrl, {
            content: header.join("\n").slice(0, 2000),
            thread_name: threadName,
        });

        const threadId = message.channel_id;

        // --- Persist session ---
        if (visitorId) {
            try {
                const store = getStore("visitors");
                const now = new Date().toISOString();
                const updated = {
                    fingerprint_visitor_id: visitorId,
                    first_seen_at: visitorRecord?.first_seen_at || now,
                    last_seen_at: now,
                    visit_count: (visitorRecord?.visit_count || 0) + 1,
                    sessions: [
                        ...(visitorRecord?.sessions || []),
                        {discord_thread_id: threadId, started_at: now, summary},
                    ],
                };
                await store.setJSON(visitorId, updated);
            } catch {
                // non-critical
            }
        }

        return Response.json({threadId});
    }

    return new Response("Bad Request", {status: 400});
}
