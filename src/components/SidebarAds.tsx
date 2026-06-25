'use client';

import { useEffect, useState } from 'react';
import AdFitBanner from './AdFitBanner';

// 사이드바 광고 단위 ID 목록 (위 → 아래 순서). 여기에 추가하면 사이드바에 쌓인다.
const SIDEBAR_UNITS = [
  'DAN-HkChJJcwmdmvKyPN', // 300x250 (사이드1)
  'DAN-b44zvnLry5LybBEo', // 300x250 (사이드2)
  'DAN-GOCNjmiC7QgUVy9x', // 300x250 (사이드3)
];

/**
 * 포스트 상세 우측 사이드바 광고 묶음 (PC 전용).
 * lg(1024px) 미만에선 마운트하지 않아 모바일에서 광고가 로드되지 않게 한다.
 * 여러 개면 세로로 쌓이고, sticky 로 스크롤 시 따라온다.
 */
export default function SidebarAds() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!show) return null;

  return (
    <div className="sticky top-24 space-y-6">
      {SIDEBAR_UNITS.map((unit) => (
        <AdFitBanner key={unit} unit={unit} width={300} height={250} />
      ))}
    </div>
  );
}
