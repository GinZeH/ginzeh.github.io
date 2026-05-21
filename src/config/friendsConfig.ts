import type { FriendLink, FriendsPageConfig } from "../types/config";
import friendsData from "../content/friends-settings/friends.json";

// 类型断言，因为直接导入的 JSON 与 Tina 类型不匹配
const _friendsData = friendsData as unknown as {
	title?: string;
	description?: string;
	friends?: Array<{
		title: string;
		imgurl?: string;
		desc?: string;
		siteurl: string;
		tags?: string[];
		weight?: number;
		enabled?: boolean;
	}>;
};

export const friendsPageConfig: FriendsPageConfig = {
	title: _friendsData.title || "",
	description: _friendsData.description || "",
	showCustomContent: true,
	showComment: true,
	randomizeSort: false,
};

export const friendsConfig: FriendLink[] = (_friendsData.friends || []).map((friend) => ({
	title: friend.title,
	imgurl: friend.imgurl || "",
	desc: friend.desc || "",
	siteurl: friend.siteurl,
	tags: friend.tags || [],
	weight: friend.weight || 0,
	enabled: friend.enabled ?? true,
}));

export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
