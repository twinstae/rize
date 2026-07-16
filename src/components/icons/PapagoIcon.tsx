import React from 'react';

function PapagoIcon({ className, ...props }: React.ComponentProps<'svg'>) {
	const maskId = `papago-mask-${React.useId().replace(/:/g, '')}`;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 32"
			fill="none"
			className={'h-6 w-6 ' + (className ?? '')}
			{...props}
		>
			<mask
				id={maskId}
				style={{ maskType: 'luminance' }}
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="21"
				height="32"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 0.0531635H20.8833V31.9468H0V0.0531635Z"
					fill="white"
				/>
			</mask>
			<g mask={`url(#${maskId})`}>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M20.8831 14.698C18.5788 14.698 14.2444 14.7237 14.2444 14.7237V0.643521H13.2277C7.75533 0.643521 6.17499 0.703679 3.71464 0.0531635C3.71464 0.0531635 3.76813 2.49771 6.28637 3.82597C4.05143 6.01049 3.38857 9.24705 3.38857 12.6235C3.38857 15.9999 3.0757 18.5522 2.6701 20.55C1.76828 24.9936 0 28.4457 0 28.4457C1.35828 28.788 2.80753 28.8139 4.19273 28.5589V31.9469C13.2456 31.9469 20.8833 26.5618 20.8833 16.5428C20.8833 16.5428 20.8831 15.4384 20.8831 14.698Z"
					fill="#00A2FF"
				/>
			</g>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.2446 11.1699V17.8611C16.9161 17.8611 19.3038 16.6293 20.8833 14.698C20.8836 14.6977 14.2446 11.1699 14.2446 11.1699Z"
				fill="#FFC600"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.2446 17.8611C10.2799 17.8611 7.06592 14.6103 7.06592 10.6002C7.06592 6.59015 10.2799 3.33936 14.2446 3.33936V17.8611Z"
				fill="#FAFDFD"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.622 9.49149C12.622 10.4186 11.8789 11.1702 10.9624 11.1702C10.0457 11.1702 9.30273 10.4186 9.30273 9.49149C9.30273 8.56439 10.0457 7.81278 10.9624 7.81278C11.8789 7.81278 12.622 8.56439 12.622 9.49149Z"
				fill="#50505F"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18.3573 1.55508C17.1057 0.971307 15.7134 0.643469 14.2446 0.643469V11.1699V11.1701H24.0813V10.5927C24.0813 6.58353 21.7353 3.13038 18.3573 1.55508Z"
				fill="#1EDA69"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.2039 21.8725C10.919 25.3354 7.88801 27.9346 4.19537 28.5729L4.19238 31.9438C8.7784 30.9494 12.2164 26.8264 12.2164 21.891"
				fill="#0087FF"
			/>
		</svg>
	);
}

export default PapagoIcon;
