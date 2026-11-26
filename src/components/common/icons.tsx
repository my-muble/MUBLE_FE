import Svg, { ClipPath, Defs, Ellipse, G, Path } from 'react-native-svg';

import { semanticTokens } from '@/styles';

// 피그마 컴포넌트 페이지 icon 섹션에서 내보낸 SVG

type IconProps = {
  size?: number;
  color?: string;
};

const DEFAULT_COLOR = semanticTokens.color.icon.tertiary;

const LINE = {
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function LineIcon({
  size = 24,
  color = DEFAULT_COLOR,
  d,
}: IconProps & {
  d: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d={d} stroke={color} {...LINE} />
    </Svg>
  );
}

// Icon/ChevronLeft
export function ChevronLeftIcon(props: IconProps) {
  return <LineIcon {...props} d="M15.6807 20.4824L7.19922 12.001L15.6807 3.51953" />;
}

// Icon/ChevronRight (Sm)
export function ChevronRightSmIcon(props: IconProps) {
  return <LineIcon {...props} d="M9.53027 16.6436L14.1719 12.002L9.53027 7.36035" />;
}

// Icon / Lyrics
export function LyricsIcon({ size = 24, color = DEFAULT_COLOR }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.99219 16.8459V8.27609M19.6421 15.7907L19.6269 5.80832M8.99219 8.27609V5.18829L19.6421 2.75977L19.6269 5.80832M8.99219 8.27609L19.6269 5.80832"
        stroke={color}
        {...LINE}
      />
      <Ellipse cx="16.5382" cy="16.0421" rx="3.10459" ry="3.13775" stroke={color} {...LINE} />
      <Ellipse cx="5.88779" cy="17.0831" rx="3.10459" ry="3.13775" stroke={color} {...LINE} />
    </Svg>
  );
}

// Icon (State=Flil / State=Defauit)
export function StarIcon({ size = 24, filled }: Pick<IconProps, 'size'> & { filled: boolean }) {
  const color = filled ? semanticTokens.color.icon.primary : semanticTokens.color.border.subtle;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.5485 3.77819C11.7332 3.40727 12.2668 3.40727 12.4515 3.77819L14.8426 8.57976C14.916 8.72705 15.0577 8.82914 15.2217 8.85276L20.5683 9.62273C20.9813 9.68221 21.1462 10.1852 20.8474 10.474L16.9786 14.2115C16.8599 14.3261 16.8057 14.4913 16.8338 14.6532L17.7471 19.9306C17.8176 20.3383 17.3859 20.6492 17.0164 20.4567L12.2343 17.965C12.0876 17.8886 11.9124 17.8886 11.7657 17.965L6.98356 20.4567C6.61415 20.6492 6.18239 20.3383 6.25294 19.9306L7.16625 14.6532C7.19426 14.4913 7.14011 14.3261 7.02143 14.2115L3.15262 10.474C2.85375 10.1852 3.01867 9.68221 3.43169 9.62273L8.77826 8.85276C8.94227 8.82914 9.08405 8.72705 9.15739 8.57976L11.5485 3.77819Z"
        fill={filled ? color : 'none'}
        stroke={color}
        {...LINE}
      />
    </Svg>
  );
}

const AVATAR_CIRCLE =
  'M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z';

// Avatar (Size=Sm)
export function AvatarIcon({ size = 36 }: Pick<IconProps, 'size'>) {
  const personColor = semanticTokens.color.icon.primary;

  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Defs>
        <ClipPath id="avatarClip">
          <Path d={AVATAR_CIRCLE} />
        </ClipPath>
      </Defs>
      <G clipPath="url(#avatarClip)">
        <Path d={AVATAR_CIRCLE} fill={semanticTokens.color.border.subtle} />
        <Path
          d="M18.001 21.4268C21.8698 21.4268 25.3938 22.8625 27.9443 24.7598C29.2179 25.7071 30.2169 26.7467 30.8867 27.7363C31.5695 28.7452 31.8437 29.6024 31.8438 30.209C31.8438 30.9943 31.5753 32.6413 30.9512 34.7412C30.337 36.8074 29.4112 39.2015 28.1738 41.4658C25.6423 46.0983 22.0897 49.7029 17.5938 49.7031C13.1234 49.7031 9.76995 46.1345 7.44238 41.5137C6.30469 39.255 5.47773 36.8637 4.93652 34.7959C4.38877 32.7031 4.15827 31.0365 4.1582 30.2217C4.1582 29.6149 4.43214 28.7564 5.11523 27.7461C5.78524 26.7551 6.78495 25.7145 8.05859 24.7656C10.6094 22.8654 14.1328 21.4268 18.001 21.4268ZM18.001 6.59863C20.6978 6.59864 23.0673 9.2012 23.0674 11.9893C23.0674 14.7104 20.7613 17.1357 18.001 17.1357C15.2406 17.1357 12.9346 14.7104 12.9346 11.9893C12.9346 9.20119 15.3041 6.59863 18.001 6.59863Z"
          fill={personColor}
          stroke={personColor}
          strokeWidth={2.8}
        />
      </G>
    </Svg>
  );
}
