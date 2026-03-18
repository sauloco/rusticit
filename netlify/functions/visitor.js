import { getStore } from "@netlify/blobs";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIVATE_IP_RE =
    /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)|^::1$|^::ffff:(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/;

// ─── Geo ──────────────────────────────────────────────────────────────────────

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

// ─── Visitor persistence (Netlify Blobs) ──────────────────────────────────────

async function loadVisitor(visitorId) {
    if (!visitorId) return null;
    try {
        return await getStore("visitors").get(visitorId, { type: "json" });
    } catch {
        return null;
    }
}

async function saveVisitor(visitorId, record) {
    if (!visitorId) return;
    try {
        await getStore("visitors").setJSON(visitorId, record);
    } catch { /* non-critical */ }
}

// ─── Inference ────────────────────────────────────────────────────────────────

function inferFields(components) {
    const c = components || {};

    const platform = String(c.platform || "").toLowerCase();
    const rendererRaw = String(c.webGlBasics?.rendererUnmasked || "");
    const vendorRaw = String(c.webGlBasics?.vendorUnmasked || "");
    const rendererLow = rendererRaw.toLowerCase();
    const vendorLow = vendorRaw.toLowerCase();
    const touch = c.touchSupport || {};
    const hasTouch = touch.maxTouchPoints > 0 || touch.touchEvent || touch.touchStart;

    // Device
    let device = "unknown";
    if (/iphone/.test(platform)) device = "iPhone";
    else if (/ipad/.test(platform)) device = "iPad";
    else if (/android/.test(platform) || /android/.test(rendererLow)) device = "Android device";
    else if (/mac/.test(platform) || /apple/.test(rendererLow) || /apple/.test(vendorLow)) device = "Mac";
    else if (/win/.test(platform)) device = "Windows PC";
    else if (/linux/.test(platform)) device = "Linux machine";
    else if (hasTouch) device = "mobile device";

    // GPU
    let gpu = "unknown";
    const appleMatch = rendererRaw.match(/Apple M(\d+)\s*(Pro|Max|Ultra)?/i);
    if (appleMatch) {
        const variant = appleMatch[2] ? `, very likely M${appleMatch[1]} ${appleMatch[2]}` : `, very likely M${appleMatch[1]}`;
        gpu = `Apple Silicon${variant}`;
    } else if (/apple/i.test(vendorRaw) || /apple/i.test(rendererRaw)) {
        gpu = "Apple Silicon";
    } else if (/nvidia/i.test(rendererRaw)) {
        const model = rendererRaw.replace(/.*?NVIDIA\s*/i, "").split("/")[0].trim();
        gpu = model ? `NVIDIA, likely ${model}` : "NVIDIA GPU";
    } else if (/amd|radeon/i.test(rendererRaw)) {
        gpu = "AMD GPU";
    } else if (/intel/i.test(rendererRaw) || /intel/i.test(vendorRaw)) {
        gpu = "Intel GPU";
    }

    // Browser
    const vendorFlavors = Array.isArray(c.vendorFlavors) ? c.vendorFlavors : [];
    const browserVendor = String(c.vendor || "").toLowerCase();
    let browser = "unknown";
    if (vendorFlavors.some((f) => /^chrome$|^chromium$/i.test(f))) browser = "Chrome/Chromium";
    else if (vendorFlavors.some((f) => /^safari$/i.test(f)) || /apple/i.test(browserVendor)) browser = "Safari/WebKit";
    else if (vendorFlavors.some((f) => /^firefox$/i.test(f))) browser = "Firefox";
    else if (/google/i.test(browserVendor)) browser = "Chromium-based browser";

    // Locale
    const languages = c.languages;
    let locale = "unknown";
    if (Array.isArray(languages) && languages.length > 0) {
        const firstLang = Array.isArray(languages[0]) ? languages[0][0] : languages[0];
        if (firstLang) {
            try {
                const [langCode, region] = firstLang.split("-");
                const langName = new Intl.DisplayNames(["en"], { type: "language" }).of(langCode);
                locale = region ? `browser in ${langName} (${region})` : `browser in ${langName}`;
                if (languages.flat().length > 1) locale += " + others";
            } catch { locale = firstLang; }
        }
    }

    // Display
    const res = c.screenResolution;
    const screenResolution = Array.isArray(res) && res.length >= 2 ? `${res[0]}×${res[1]}` : "unknown";

    // Storage
    const storageList = [];
    if (c.localStorage) storageList.push("localStorage");
    if (c.sessionStorage) storageList.push("sessionStorage");
    if (c.indexedDB) storageList.push("indexedDB");
    const storage = storageList.length === 0 ? "restricted"
        : storageList.length === 3 ? `normal (${storageList.join(", ")})`
        : storageList.join(", ");

    // Color
    let color = "unknown";
    const gamut = c.colorGamut;
    if (gamut === "rec2020") color = "wide color (rec2020)";
    else if (gamut === "p3") color = "wide color (p3)";
    else if (gamut === "srgb") color = "standard color (sRGB)";

    return {
        device, gpu, browser, locale,
        timezone: c.timezone || "unknown",
        screenResolution,
        touch: hasTouch ? "yes" : "no",
        storage,
        color,
        pdf: c.pdfViewerEnabled ? "yes" : "no",
    };
}

function buildSummaryText(fields, botDetection, visitorStatus, previousThreadId) {
    const prevThread = previousThreadId
        ? `https://discord.com/channels/739837377614184489/${previousThreadId}`
        : "none";

    const lines = [];
    if (botDetection) {
        const kind = botDetection.botKind ? ` (${botDetection.botKind})` : "";
        lines.push(`Bot detection: ${botDetection.bot ? `🤖 bot detected${kind}` : "✅ human"}`);
    }
    lines.push(`Likely device: ${fields.device}`);
    lines.push(`Likely chip/GPU: ${fields.gpu}`);
    lines.push(`Likely browser family: ${fields.browser}`);
    lines.push(`Locale config: ${fields.locale}`);
    lines.push(`Timezone config: ${fields.timezone}`);
    lines.push(`Display context: ${fields.screenResolution}`);
    lines.push(`Touch: ${fields.touch}`);
    lines.push(`Storage support: ${fields.storage}`);
    lines.push(`Color: ${fields.color}`);
    lines.push(`PDF support: ${fields.pdf}`);
    lines.push(`Visitor status: ${visitorStatus}`);
    lines.push(`Previous Discord thread: ${prevThread}`);
    return lines.join("\n");
}

// ─── Discord ──────────────────────────────────────────────────────────────────

async function notifyDiscord({ webhookUrl, location, ip, shortId, page, referrer, tracking, summary, botDetection, visitorStatus }) {
    const header = [
        `Location | IP: **${location}** | \`${ip}\``,
        `ID: \`${shortId}\``,
        `Start page: \`${page || "Homepage"}\``,
    ];
    if (referrer) header.push(`🔗 ${referrer}`);
    if (tracking && Object.keys(tracking).length > 0) {
        const lines = Object.entries(tracking).map(([k, v]) => `  ${k}: ${v}`).join("\n");
        header.push(`\n🔖 **Tracked link**\n${lines}`);
    }
    header.push("", summary);

    const vipPrefix = tracking && Object.keys(tracking).length > 0 ? "💎 VIP · " : "";
    const humanLabel = botDetection?.bot ? "Bot" : "Human";
    const returningLabel = visitorStatus === "returning" ? "Returning" : "First Time";
    const locationSuffix = location !== "Unknown location" ? ` — ${location}` : "";
    const threadName = `${vipPrefix}${humanLabel} · ${returningLabel} · ${shortId}${locationSuffix}`;

    const res = await fetch(`${webhookUrl}?wait=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: header.join("\n").slice(0, 2000),
            thread_name: threadName,
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Discord webhook failed: ${res.status} — ${text}`);
    }
    const msg = await res.json();
    return msg.channel_id;
}

async function postToThread(webhookUrl, threadId, content) {
    const res = await fetch(`${webhookUrl}?thread_id=${threadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Thread POST failed: ${res.status} — ${text}`);
    }
}

// ─── Google Sheets ────────────────────────────────────────────────────────────

async function logToSheets({ sheetUrl, shortId, visitorStatus, botDetection, ip, geo, page, referrer, tracking, fields, discordThreadId, previousThreadId }) {
    const t = tracking || {};
    const payload = {
        shortId,
        visitorStatus,
        isBot: botDetection?.bot ?? false,
        botKind: botDetection?.botKind ?? "",
        ip,
        city: geo?.city ?? "",
        country: geo?.country ?? "",
        page: page || "/",
        referrer: referrer || "",
        utm_source: t.utm_source || "",
        utm_medium: t.utm_medium || "",
        utm_campaign: t.utm_campaign || "",
        utm_content: t.utm_content || "",
        utm_term: t.utm_term || "",
        to: t.to || "",
        ref: t.ref || "",
        via: t.via || "",
        src: t.src || "",
        device: fields.device,
        browser: fields.browser,
        gpu: fields.gpu,
        locale: fields.locale,
        timezone: fields.timezone,
        screenResolution: fields.screenResolution,
        touch: fields.touch,
        color: fields.color,
        pdf: fields.pdf,
        discordThreadId,
        previousThreadId: previousThreadId || "",
    };

    try {
        await fetch(sheetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch { /* non-critical */ }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req) {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) return new Response("Missing env vars", { status: 500 });

    let body;
    try { body = await req.json(); }
    catch { return new Response("Bad Request", { status: 400 }); }

    const { type } = body;

    if (type === "thread") {
        const { threadId, content } = body;
        if (!threadId || !content) return new Response("Bad Request", { status: 400 });
        await postToThread(webhookUrl, threadId, content);
        return new Response(null, { status: 204 });
    }

    if (type === "visit") {
        const { visitorId, page, referrer, components, botDetection, tracking } = body;

        const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-nf-client-connection-ip") || "";
        const allowLocalhost = process.env.ALLOW_LOCALHOST_ANALYTICS === "true";
        if (!allowLocalhost && (PRIVATE_IP_RE.test(ip) || !ip)) return Response.json({ threadId: null });

        // Load visitor record + geo in parallel
        const [visitorRecord, geo] = await Promise.all([
            loadVisitor(visitorId),
            getGeo(ip),
        ]);

        const visitorStatus = visitorRecord ? "returning" : "new";
        const previousThreadId = visitorRecord?.sessions?.at(-1)?.discord_thread_id ?? null;
        const location = geo ? `${geo.city}, ${geo.country}` : "Unknown location";
        const shortId = visitorId ? visitorId.slice(0, 8) : "????????";

        const fields = inferFields(components);
        const summary = buildSummaryText(fields, botDetection, visitorStatus, previousThreadId);

        // Discord + Sheets in parallel
        const [threadId] = await Promise.all([
            notifyDiscord({ webhookUrl, location, ip, shortId, page, referrer, tracking, summary, botDetection, visitorStatus }),
            sheetUrl ? logToSheets({ sheetUrl, shortId, visitorStatus, botDetection, ip, geo, page, referrer, tracking, fields, discordThreadId: null, previousThreadId }) : Promise.resolve(),
        ]);

        // Persist session + update Sheets row with threadId (fire and forget)
        const now = new Date().toISOString();
        const updated = {
            fingerprint_visitor_id: visitorId,
            first_seen_at: visitorRecord?.first_seen_at || now,
            last_seen_at: now,
            visit_count: (visitorRecord?.visit_count || 0) + 1,
            sessions: [...(visitorRecord?.sessions || []), { discord_thread_id: threadId, started_at: now, summary }],
        };
        saveVisitor(visitorId, updated);

        return Response.json({ threadId });
    }

    return new Response("Bad Request", { status: 400 });
}
