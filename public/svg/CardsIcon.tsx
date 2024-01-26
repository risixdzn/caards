export default function CardsIcon(props: any, fill?: string) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
            <g clipPath='url(#a)'>
                <g clipPath='url(#b)'>
                    <rect width={13} height={20} x={7} y={3} fill={fill} rx={2} />
                </g>
                <path fill={fill} d='M14 23c.8 0 1-.667 1-1h2.5v1H14Z' />
                <g clipPath='url(#c)'>
                    <rect width={13} height={17} x={11} y={6} fill={fill} rx={2} />
                </g>
                <path fill={fill} d='M21 22c0 .8-.667 1-1 1h2v-1h-1Z' />
                <rect width={14} height={22} y={1} fill={fill} rx={2} />
            </g>
            <defs>
                <clipPath id='a'>
                    <path fill='#fff' d='M0 0h24v24H0z' />
                </clipPath>
                <clipPath id='b'>
                    <path fill='#fff' d='M15 0h9v24h-9z' />
                </clipPath>
                <clipPath id='c'>
                    <path fill='#fff' d='M21 0h6v23h-6z' />
                </clipPath>
            </defs>
        </svg>
    );
}
