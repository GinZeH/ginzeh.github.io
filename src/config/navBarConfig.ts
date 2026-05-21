import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";
import siteSettings from "../content/site-settings/settings.json";
import navBarConfigData from "../content/nav-bar-config/navbar.json";

const getDynamicNavBarConfig = (): NavBarConfig => {
	const links: (NavBarLink | LinkPreset)[] = [
		LinkPreset.Home,
		LinkPreset.Archive,
	];

	if (siteSettings.pageFriends) {
		links.push(LinkPreset.Friends);
	}

	if (siteSettings.pageGuestbook) {
		links.push(LinkPreset.Guestbook);
	}

	links.push({
		name: "我的",
		url: "/my/",
		icon: "material-symbols:person",
		children: [
			...(siteSettings.pageGallery ? [LinkPreset.Gallery] : []),
			...(siteSettings.pageBangumi ? [LinkPreset.Bangumi] : []),
		],
	});

	links.push({
		name: "关于",
		url: "/content/",
		icon: "material-symbols:info",
		children: [
			...(siteSettings.pageSponsor ? [LinkPreset.Sponsor] : []),
			LinkPreset.About,
		],
	});

	const customLinks = navBarConfigData.customLinks || [];
	if (customLinks.length > 0) {
		const sortedLinks = [...customLinks].sort((a, b) => (a.order || 0) - (b.order || 0));
		links.push({
			name: "链接",
			url: "/links/",
			icon: "material-symbols:link",
			children: sortedLinks.map(link => ({
				name: link.name,
				url: link.url,
				icon: link.icon || "",
				external: link.external || false,
			})),
		});
	}

	return { links } as NavBarConfig;
};

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();