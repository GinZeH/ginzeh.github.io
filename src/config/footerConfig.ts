import type { FooterConfig } from "../types/config";
import { getFooterConfig } from "./siteConfig";

const footerSettings = getFooterConfig();

export const footerConfig: FooterConfig = {
	enable: footerSettings.enable,
};