'use client';

import { useEffect, useRef } from 'react';

interface AdFitBannerProps {
  /** 카카오 애드핏 광고 단위 ID (예: DAN-xxxxxxxx) */
  unit: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * 카카오 애드핏 배너.
 *
 * 애드핏 스크립트(ba.min.js)는 로드 시점에 페이지의 .kakao_ad_area 를 1회
 * 스캔해 광고를 채운다. Next.js는 SPA 라우팅이라 페이지 이동 시 새로고침이
 * 없어 기본 스니펫을 그대로 쓰면 다음 글에서 광고가 안 뜬다.
 * 따라서 마운트할 때마다 <ins> + <script> 를 새로 주입하고, 언마운트 시
 * 정리해 매 페이지에서 광고가 새로 렌더되도록 한다.
 */
export default function AdFitBanner({ unit, width, height, className }: AdFitBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ins = document.createElement('ins');
    ins.className = 'kakao_ad_area';
    ins.style.display = 'none';
    ins.setAttribute('data-ad-width', String(width));
    ins.setAttribute('data-ad-height', String(height));
    ins.setAttribute('data-ad-unit', unit);

    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    container.appendChild(ins);
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [unit, width, height]);

  return <div ref={containerRef} className={className} style={{ width, height }} />;
}
