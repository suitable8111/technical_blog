'use client';

import { useEffect, useState } from 'react';
import AdFitBanner from './AdFitBanner';

// 카카오 애드핏 광고 단위 ID
const PC_UNIT = 'DAN-vJePDpzT4siTEvWR'; // 728x90
const MOBILE_UNIT = 'DAN-qgbzzOjH7LtRy9uD'; // 320x100

/**
 * 화면 폭에 따라 PC(728x90) 또는 모바일(320x100) 배너 중 하나만 렌더한다.
 * CSS로 둘 다 띄우고 하나를 숨기면 숨긴 광고도 로드되어(비노출 노출) 낭비되므로,
 * matchMedia로 실제 필요한 하나만 마운트한다.
 */
export default function ResponsiveAdFit({ className }: { className?: string }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // 서버 렌더/하이드레이션 시점엔 폭을 모르므로 아무것도 렌더하지 않는다.
  if (isDesktop === null) return null;

  return (
    <div className={`flex justify-center my-8 ${className ?? ''}`}>
      {isDesktop ? (
        <AdFitBanner unit={PC_UNIT} width={728} height={90} />
      ) : (
        <AdFitBanner unit={MOBILE_UNIT} width={320} height={100} />
      )}
    </div>
  );
}
