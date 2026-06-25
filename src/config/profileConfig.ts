import type { ProfileConfig } from "../types/config";
import rawProfileSettings from "../content/profile-settings/profile.json";

const profileSettings = rawProfileSettings as ProfileConfig;

export const profileConfig: ProfileConfig = {
	avatar: profileSettings.avatar,
	name: profileSettings.name,
	bio: profileSettings.bio,
	links: (profileSettings.links ?? []).map((link) => ({
		name: link.name,
		icon: link.icon,
		url: link.url,
		showName: false,
	})),
};
