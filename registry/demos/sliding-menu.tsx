"use client";

import {
	SlidingMenu,
	SlidingMenuTrigger,
	SlidingMenuContent,
	SlidingMenuPortal,
	SlidingMenuPage,
	SlidingMenuItem,
	SlidingMenuSeperator,
} from "../components/sliding-menu";

import {
	BankIcon,
	CaretRightIcon,
	CodeIcon,
	CreditCardIcon,
	DownloadSimpleIcon,
	GearIcon,
	GithubLogoIcon,
	HandPalmIcon,
	ProhibitIcon,
	SignOutIcon,
	UserGearIcon,
	UserListIcon,
	UsersThreeIcon,
} from "@phosphor-icons/react";

export function SlidingMenuDemo() {
	return (
		<SlidingMenu>
			<SlidingMenuTrigger>
				<div className="p-1.5 cursor-pointer rounded-full hover:bg-secondary/70 duration-75 ease-out animate-all hover:scale-[104%] active:scale-[98%] active:rotate-60">
					<GearIcon size={32} />
				</div>
			</SlidingMenuTrigger>
			<SlidingMenuPortal>
				<SlidingMenuContent className="h-56.5">
					<SlidingMenuPage pageId="default">
						<SlidingMenuItem navigateToPage="account">
							Account
							<CaretRightIcon />
						</SlidingMenuItem>
						<SlidingMenuItem navigateToPage="">
							Support <UserGearIcon size={18} />
						</SlidingMenuItem>
						<SlidingMenuItem navigateToPage="">
							Download <DownloadSimpleIcon size={18} />
						</SlidingMenuItem>
						<SlidingMenuItem navigateToPage="">
							API Documentation <CodeIcon size={18} />
						</SlidingMenuItem>
						<a href="https://github.com/FifthWit/ui">
							<SlidingMenuItem
								navigateToPage=""
								className="hover:text-yellow-300 text-yellow-200 duration-200 ease-out transition-colors"
							>
								Star us on GitHub <GithubLogoIcon size={18} />
							</SlidingMenuItem>
						</a>
						<SlidingMenuItem variant="destructive">
							Log Out <SignOutIcon size={18} />
						</SlidingMenuItem>
					</SlidingMenuPage>
					<SlidingMenuPage pageId="account">
						<SlidingMenuItem>
							Friends List <UserListIcon size={18} />
						</SlidingMenuItem>
						<SlidingMenuItem>
							Mutuals <UsersThreeIcon size={18} />
						</SlidingMenuItem>
						<SlidingMenuSeperator />
						<SlidingMenuItem>
							Blocked Users <ProhibitIcon size={18} />
						</SlidingMenuItem>
						<SlidingMenuItem>
							Ignored Users <HandPalmIcon size={18} />
						</SlidingMenuItem>
						<SlidingMenuSeperator />
						<SlidingMenuItem disabled>
							Funds <CreditCardIcon size={18} />
						</SlidingMenuItem>
						<SlidingMenuItem disabled>
							Billing Information <BankIcon size={18} />
						</SlidingMenuItem>
					</SlidingMenuPage>
				</SlidingMenuContent>
			</SlidingMenuPortal>
		</SlidingMenu>
	);
}
