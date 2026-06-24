import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import './visitorcounter.css';

const VISITS_TABLE = 'site_visitors';

// Lightweight browser/OS detection from the UA string.
const detectBrowser = () => {
    const ua = navigator.userAgent;
    if (/edg/i.test(ua)) return 'Edge';
    if (/chrome|crios/i.test(ua)) return 'Chrome';
    if (/firefox|fxios/i.test(ua)) return 'Firefox';
    if (/safari/i.test(ua)) return 'Safari';
    if (/opr|opera/i.test(ua)) return 'Opera';
    return 'Browser';
};

const detectOS = () => {
    const ua = navigator.userAgent;
    if (/windows/i.test(ua)) return 'Windows';
    if (/android/i.test(ua)) return 'Android';
    if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
    if (/mac/i.test(ua)) return 'macOS';
    if (/linux/i.test(ua)) return 'Linux';
    return '';
};

export const VisitorCounter = () => {
    const [online, setOnline] = useState(1);
    const [total, setTotal] = useState(null);
    const [visitor, setVisitor] = useState(null);

    // 1) Resolve visitor info (geo + device) and record/count the visit.
    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            const browser = detectBrowser();
            const os = detectOS();

            // --- Visitor geolocation (free, no API key) ---
            let geo = {};
            try {
                const res = await fetch('https://ipwho.is/');
                const data = await res.json();
                if (data && data.success !== false) {
                    geo = {
                        city: data.city,
                        country: data.country,
                        countryCode: data.country_code,
                        flag: data.flag?.emoji || '',
                    };
                }
            } catch (e) {
                /* geolocation is best-effort */
            }

            if (!cancelled) {
                setVisitor({ ...geo, browser, os });
            }

            // --- Total visits via Supabase, with localStorage fallback ---
            try {
                // Count this visit at most once per day per device.
                const today = new Date().toDateString();
                if (localStorage.getItem('visit-recorded') !== today) {
                    await supabase.from(VISITS_TABLE).insert([
                        {
                            country: geo.country || null,
                            city: geo.city || null,
                            browser,
                            os,
                        },
                    ]);
                    localStorage.setItem('visit-recorded', today);
                }

                const { count, error } = await supabase
                    .from(VISITS_TABLE)
                    .select('*', { count: 'exact', head: true });

                if (error) throw error;
                if (!cancelled && typeof count === 'number') setTotal(count);
            } catch (e) {
                // Fallback: local-only counter so the UI still shows something.
                const local = parseInt(localStorage.getItem('visit-count') || '0', 10) + 1;
                localStorage.setItem('visit-count', String(local));
                if (!cancelled) setTotal(local);
            }
        };

        run();
        return () => {
            cancelled = true;
        };
    }, []);

    // 2) Live "online now" via Supabase Realtime presence.
    useEffect(() => {
        const key = `v_${Math.random().toString(36).slice(2)}`;
        const channel = supabase.channel('online-visitors', {
            config: { presence: { key } },
        });

        channel
            .on('presence', { event: 'sync' }, () => {
                const state = channel.presenceState();
                const count = Object.keys(state).length;
                setOnline(count > 0 ? count : 1);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({ online_at: new Date().toISOString() });
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="visitors" aria-label="Visitor statistics">
            <div className="visitors_stats">
                <span className="visitors_pill">
                    <span className="visitors_dot" />
                    <strong>{online}</strong> online now
                </span>
                <span className="visitors_pill">
                    <i className="uil uil-eye"></i>
                    <strong>{total === null ? '…' : total.toLocaleString()}</strong> total visits
                </span>
            </div>

            {visitor && (visitor.country || visitor.browser) && (
                <p className="visitors_info">
                    {visitor.flag && <span className="visitors_flag">{visitor.flag}</span>}
                    {visitor.city || visitor.country ? (
                        <>
                            You're visiting from{' '}
                            <strong>
                                {[visitor.city, visitor.country].filter(Boolean).join(', ')}
                            </strong>
                        </>
                    ) : (
                        <>Welcome</>
                    )}
                    {visitor.browser && (
                        <>
                            {' '}· {visitor.browser}
                            {visitor.os ? ` on ${visitor.os}` : ''}
                        </>
                    )}
                </p>
            )}
        </div>
    );
};
