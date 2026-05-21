import type { ProfileConfig } from "../types/config";
import profileSettings from "../content/profile-settings/profile.json";

interface LinkItem {
	name: string;
	icon: string;
	url: string;
}

// 类型断言，因为直接导入的 JSON 与 Tina 类型不匹配
const _profileSettings = profileSettings as unknown as {
	avatar?: string;
	name: string;
	bio?: string;
	links?: Array<LinkItem>;
};

export const profileConfig: ProfileConfig = {
	avatar: _profileSettings.avatar || "",
	name: _profileSettings.name,
	bio: _profileSettings.bio || "",
	links: (_profileSettings.links || []).map((link) => ({
		name: link.name,
		icon: link.icon,
		url: link.url,
		showName: false,
	})),
};