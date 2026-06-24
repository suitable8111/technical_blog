import AdFitBanner from './AdFitBanner';

const INFEED_UNIT = 'DAN-yxdErMbvIh9DHUyC'; // 300x250

/**
 * 글 목록 그리드 중간에 카드 형태로 끼워넣는 인-피드 광고.
 * PostCard 한 칸 자리를 차지한다.
 */
export default function InFeedAdCard() {
  return (
    <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-dashed border-gray-200/70 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <AdFitBanner unit={INFEED_UNIT} width={300} height={250} />
    </div>
  );
}
