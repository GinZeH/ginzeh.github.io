import type { SakuraConfig } from "../types/config";
import effectsSettings from "../content/effects-settings/effects.json";

export const sakuraConfig: SakuraConfig = {
	enable: effectsSettings.sakuraEnable ?? false,
	switchable: effectsSettings.sakuraSwitchable ?? true,
	sakuraNum: effectsSettings.sakuraNum || 21,
	limitTimes: effectsSettings.sakuraLimitTimes || -1,
	size: {
		min: 0.5,
		max: 1.1,
	},
	opacity: {
		min: 0.3,
		max: 0.9,
	},
	speed: {
		horizontal: {
			min: -1.7,
			max: -1.2,
		},
		vertical: {
			min: 1.5,
			max: 2.2,
		},
		rotation: 0.03,
		fadeSpeed: 0.03,
	},
	zIndex: 100,
};