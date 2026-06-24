'use client';

import { useEffect, useState } from 'react';
import AdFitBanner from './AdFitBanner';

const SIDEBAR_UNIT = 'DAN-HkChJJcwmdmvKyPN'; // 300x250

/**
 * 포스트 상세 우측 사이드바 광고 (PC 전용).
 * lg(1024px) 미만에선 마운트하지 않아 모바일에서 광고가 로드되지 않게 한다.
 */
export default function SidebarAd() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!show) return null;
  return <AdFitBanner unit={SIDEBAR_UNIT} width={300} height={250} />;
}
